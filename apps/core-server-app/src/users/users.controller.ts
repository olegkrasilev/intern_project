import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '@packages/database';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: UserDTO): Promise<User | void> {
    return this.userService.create(createUserDto);
  }
}
