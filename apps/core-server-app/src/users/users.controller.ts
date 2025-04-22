import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@packages/database';
import { CreateUserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
