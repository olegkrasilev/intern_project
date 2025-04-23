/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable sonarjs/no-hardcoded-passwords */
// for testing purpose

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { UserDTO } from 'src/users/dto/user.dto';
import { PrismaService } from '../src/database/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  const user: Omit<UserDTO, 'id'> = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    nickname: 'John',
    phone: '+33333333333',
    passwordHash: '12345',
    bio: null,
    isDisabled: false,
    role: 'user',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };

  it('should create a user successfully and return status 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
    expect(response.body.nickname).toBe(user.nickname);
    expect(response.body.phone).toBe(user.phone);
    expect(response.body.passwordHash).toBe(user.passwordHash);
    expect(response.body.bio).toBe(user.bio);
    expect(response.body.isDisabled).toBe(user.isDisabled);
    expect(response.body.role).toBe(user.role);
    expect(new Date(response.body.createdAt).toISOString()).toBe(
      user.createdAt.toISOString(),
    );
    expect(response.body.updatedAt).toBe(user.updatedAt);
    expect(response.body.deletedAt).toBe(user.deletedAt);
    return response;
  });

  it('should not create a user with empty email', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        email: '',
      } satisfies Pick<UserDTO, 'email'>)
      .expect(400);

    return response;
  });

  it('should not create a user with empty passwordHash', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        passwordHash: '',
      } satisfies Pick<UserDTO, 'passwordHash'>)
      .expect(400);

    return response;
  });

  it('should not create a user with empty role', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        role: '',
      } satisfies Pick<UserDTO, 'role'>)
      .expect(400);

    return response;
  });

  it('should not create a user with invalid role', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        role: 'superADMIN',
      } satisfies Pick<UserDTO, 'role'>)
      .expect(400);

    return response;
  });

  it('should return 500 on database error', async () => {
    jest
      .spyOn(prisma.user, 'create')
      .mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(500);

    expect(response.body.message).toBe('Internal server error');
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });
});
