import { Injectable } from '@nestjs/common';
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
// @Injectable()
// export class ExistingUserStrategy {
//   constructor(private readonly userRepository: UserRepository) {}

//   async create(userDto: UserDTO) {
//     // Логика для обработки случая, когда пользователь уже существует
//     throw new Error('User already exists');
//   }
// }
