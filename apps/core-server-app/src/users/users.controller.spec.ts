import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateNewUserStrategy } from './strategy/user.strategy';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UserService,
        UserRepository,
        CreateNewUserStrategy,
        PrismaService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
