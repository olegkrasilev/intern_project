import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDTO } from '../dto/user.dto';
import { User } from '@packages/database';
import { hashPassword } from '../../shared/utils/bcrypt';

@Injectable()
export class CreateNewUserStrategy {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDTO: Omit<UserDTO, 'passwordHash'>): Promise<User> {
    const passwordHash = await hashPassword(userDTO.password);

    return this.userRepository.createUser({
      bio: userDTO.bio,
      email: userDTO.email,
      name: userDTO.name,
      nickname: userDTO.nickname,
      phone: userDTO.phone,
      role: userDTO.role,
      passwordHash,
    });
  }
}

@Injectable()
export class ExistingUserStrategy {
  handleExistingUser() {
    throw new ConflictException('User already exist');
  }
}

@Injectable()
export class UpdateUserStrategy {
  constructor(private readonly userRepository: UserRepository) {}

  async handleUpdateUser(
    { id }: Pick<User, 'id'>,
    userDTO: UserDTO,
  ): Promise<User | void> {
    const email = userDTO.email;
    const existingUser = await this.userRepository.findUserByEmail({ email });

    if (existingUser && existingUser.id !== id) {
      throw new ConflictException('Email is already in use');
    }

    return this.userRepository.updateUserById({ id }, userDTO);
  }
}
