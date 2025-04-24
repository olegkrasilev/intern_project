import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '@packages/database';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDTO: UserDTO): Promise<User | void> {
    return this.userService.createUser(createUserDTO);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Delete(':id')
  deleteUser(@Param() params: Pick<User, 'id'>): Promise<User> {
    return this.userService.deleteUserById({ id: params.id });
  }

  @Patch(':id')
  updateUser(
    @Param() params: Pick<User, 'id'>,
    @Body() data: UserDTO,
  ): Promise<User | void> {
    return this.userService.updateUserById({ id: params.id }, data);
  }
}
