import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDTO } from '../dto/user.dto';
import { User } from '@packages/database';

@Injectable()
export class CreateNewUserStrategy {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDto: UserDTO): Promise<User> {
    return this.userRepository.createUser(userDto);
  }
}
@Injectable()
export class ExistingUserStrategy {
  handleExistingUser() {
    throw new ConflictException('User already exist');
  }
}
