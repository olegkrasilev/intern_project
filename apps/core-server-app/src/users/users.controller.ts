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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserDTO })
  @ApiResponse({ status: 201, description: 'User created successfully' })
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
