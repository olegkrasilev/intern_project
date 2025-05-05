import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserDTO } from './dto/user.dto';
import {
  CreateNewUserStrategy,
  ExistingUserStrategy,
  UpdateUserStrategy,
} from './strategy/user.strategy';
import { User } from '@packages/database';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createNewUserStrategy: CreateNewUserStrategy,
    private readonly existingUserStrategy: ExistingUserStrategy,
    private readonly updateUserStrategy: UpdateUserStrategy,
  ) {}

  async createUser(userDTO: UserDTO): Promise<User | void> {
    const existingUser = await this.userRepository.findUserByEmail(userDTO);

    if (existingUser) {
      return this.existingUserStrategy.handleExistingUser();
    }

    return this.createNewUserStrategy.createUser(userDTO);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async deleteUserById({ id }: Pick<User, 'id'>): Promise<void> {
    return this.userRepository.deleteUserById({ id });
  }

  async updateUserById({ id }: Pick<User, 'id'>, userDTO: UserDTO) {
    return this.updateUserStrategy.handleUpdateUser({ id }, userDTO);
  }
}
