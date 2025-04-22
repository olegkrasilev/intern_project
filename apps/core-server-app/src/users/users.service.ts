import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDTO) {
    return this.userRepository.createUser(createUserDto);
  }
}
