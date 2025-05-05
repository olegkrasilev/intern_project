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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserDTO })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid input' })
  @ApiResponse({ status: 409, description: 'Conflict: User already exists' })
  createUser(@Body() createUserDTO: UserDTO): Promise<User | void> {
    return this.userService.createUser(createUserDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all users',
  })
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to delete',
    type: String,
  })
  deleteUser(@Param() params: Pick<User, 'id'>): Promise<void> {
    return this.userService.deleteUserById({ id: params.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
    type: String,
  })
  @ApiBody({ type: UserDTO, description: 'User data to update' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid input' })
  updateUser(
    @Param() params: Pick<User, 'id'>,
    @Body() data: UserDTO,
  ): Promise<User | void> {
    return this.userService.updateUserById({ id: params.id }, data);
  }
}
