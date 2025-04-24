import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDTO } from '../dto/user.dto';
import { User } from '@packages/database';
import { prepareUserDTO } from '../dto/prepare.user.dto';

@Injectable()
export class CreateNewUserStrategy {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDTO: UserDTO): Promise<User> {
    const preparedUserDTO = await prepareUserDTO(userDTO);

    return this.userRepository.createUser(preparedUserDTO);
  }
}

@Injectable()
export class ExistingUserStrategy {
  handleExistingUser() {
    throw new ConflictException('User already exist');
  }
}
