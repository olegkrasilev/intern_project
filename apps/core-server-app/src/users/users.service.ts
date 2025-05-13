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

  async createUser(
    userDTO: Omit<UserDTO, 'passwordHash'>,
  ): Promise<User | void> {
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
    console.log(`Attempting to update user with ID: ${id}`);
    console.log('User data to update:', userDTO);

    return this.updateUserStrategy.handleUpdateUser({ id }, userDTO);
  }
}
