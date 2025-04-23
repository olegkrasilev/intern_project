import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserDTO } from './dto/user.dto';
import {
  CreateNewUserStrategy,
  ExistingUserStrategy,
} from './strategy/user.strategy';
import { User } from '@packages/database';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createNewUserStrategy: CreateNewUserStrategy,
    private readonly existingUserStrategy: ExistingUserStrategy,
  ) {}

  async create(userDto: UserDTO): Promise<User | void> {
    const existingUser = await this.userRepository.findUserByEmail(userDto);

    if (existingUser) {
      return this.existingUserStrategy.handleExistingUser();
    }

    return this.createNewUserStrategy.createUser(userDto);
  }
}
