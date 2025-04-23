import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from '../database/prisma.service';
import {
  CreateNewUserStrategy,
  ExistingUserStrategy,
} from './strategy/user.strategy';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UserService,
    UserRepository,
    CreateNewUserStrategy,
    ExistingUserStrategy,
    PrismaService,
  ],
})
export class UserModule {}
