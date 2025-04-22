import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PrismaService],
})
export class UsersModule {}
