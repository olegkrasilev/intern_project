import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from '../database/prisma.service';
import {
  CreateNewUserStrategy,
  ExistingUserStrategy,
  UpdateUserStrategy,
} from './strategy/user.strategy';
import { AuthService } from '../modules/auth/auth.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UserService,
    UserRepository,
    CreateNewUserStrategy,
    ExistingUserStrategy,
    UpdateUserStrategy,
    PrismaService,
    AuthService,
  ],
})
export class UserModule {}
