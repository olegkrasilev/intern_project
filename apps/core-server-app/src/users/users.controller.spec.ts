import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreateNewUserStrategy,
  ExistingUserStrategy,
  UpdateUserStrategy,
} from './strategy/user.strategy';
import { AuthGuard } from '../guards/auth';
import { AuthService } from '../modules/auth/auth.service';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [UsersController],
      providers: [
        UserService,
        UserRepository,
        CreateNewUserStrategy,
        ExistingUserStrategy,
        UpdateUserStrategy,
        PrismaService,
        AuthService,
        AuthGuard,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
