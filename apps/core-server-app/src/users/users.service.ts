import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserDTO } from './dto/user.dto';
import { CreateNewUserStrategy } from './strategy/user.strategy';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createNewUserStrategy: CreateNewUserStrategy,
  ) {}

  async create(userDto: UserDTO) {
    const existingUser = await this.userRepository.findUserByEmail(userDto);

    if (!existingUser) {
      return this.createNewUserStrategy.createUser(userDto);
    }

    return this.userRepository.createUser(userDto);
  }
}
