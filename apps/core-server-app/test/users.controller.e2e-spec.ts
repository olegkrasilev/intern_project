/* eslint-disable jest/expect-expect */
/* eslint-disable sonarjs/no-hardcoded-passwords */
// for testing purpose

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { UserDTO } from 'src/users/dto/user.dto';
import { PrismaService } from '../src/database/prisma.service';
import * as bcrypt from 'bcrypt';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
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
    role: 'user',
  };

  it('should create a user successfully and return status 201', async () => {
    const response = (await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)) as { body: UserDTO };

    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
    expect(response.body.nickname).toBe(user.nickname);
    expect(response.body.phone).toBe(user.phone);
    expect(response.body.passwordHash).not.toBe(user.passwordHash);
    expect(response.body.bio).toBe(user.bio);
    expect(response.body.role).toBe(user.role);

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

  it('should return 500 on database error and throw an error', async () => {
    jest
      .spyOn(prisma.user, 'create')
      .mockRejectedValueOnce(new Error('Database error'));

    const response = (await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(500)) as { body: { message: string } };

    expect(response.body.message).toBe('Internal server error');
  });

  it('should not create a user with SQL injection in email or password', async () => {
    const maliciousData = {
      email: 'john.doe@example.com',
      name: "<script>alert('xss');</script><b>John Doe</b> <i>This is a test</i> <img src='x' onerror='alert(\"Hacked!\")'>",
      passwordHash: "'; DROP TABLE users; --",
      nickname: 'Malicious',
      phone: '+33333333333',
      bio: null,
      role: 'user',
    } satisfies UserDTO;

    const response = (await request(app.getHttpServer())
      .post('/users')
      .send(maliciousData)
      .expect(201)) as { body: UserDTO };

    expect(response.body.name).toBe('John Doe This is a test');
  });

  it('should not create the user twice with the same email', async () => {
    await request(app.getHttpServer()).post('/users').send(user).expect(201);
    await request(app.getHttpServer()).post('/users').send(user).expect(409);
  });

  it('should password be hashed', async () => {
    const clonedUser = structuredClone(user);
    const response = (await request(app.getHttpServer())
      .post('/users')
      .send(clonedUser)
      .expect(201)) as { body: UserDTO };

    expect(response.body.passwordHash).not.toBe(clonedUser.passwordHash);

    const isMatch = await bcrypt.compare(
      clonedUser.passwordHash,
      response.body.passwordHash,
    );

    expect(isMatch).toBe(true);
  });

  it('should return all users', async () => {
    const anotherUser = {
      email: 'john1.doe@example.com',
      name: 'john1',
      passwordHash: '12345',
      nickname: 'johnny',
      phone: '+2222222222',
      bio: null,
      role: 'user',
    } satisfies UserDTO;

    await request(app.getHttpServer()).post('/users').send(user).expect(201);
    await request(app.getHttpServer())
      .post('/users')
      .send(anotherUser)
      .expect(201);

    const users = await prisma.user.findMany();

    expect(users.length).toBe(2);
  });

  it('should delete user', async () => {
    const response = (await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)) as { body: UserDTO & { id: string } };
    const users = await prisma.user.findMany();

    expect(users.length).toBe(1);
    const userId = response.body.id;

    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);
  });

  it('should not delete user with invalid id', async () => {
    (await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)) as { body: UserDTO & { id: string } };
    let users = await prisma.user.findMany();

    expect(users.length).toBe(1);
    const randomId = '12345';

    await request(app.getHttpServer()).delete(`/users/${randomId}`).expect(404);
    users = await prisma.user.findMany();

    expect(users.length).toBe(1);
  });

  it('should correctly update the user', async () => {
    const clonedUser = structuredClone(user);
    const response = (await request(app.getHttpServer())
      .post('/users')
      .send(clonedUser)
      .expect(201)) as { body: UserDTO & { id: string } };

    const userId = response.body.id;

    clonedUser.name = 'newName';
    clonedUser.nickname = 'newNickname';
    await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send(clonedUser)
      .expect(200);

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    expect(updatedUser?.name).toBe(clonedUser.name);
    expect(updatedUser?.nickname).toBe(clonedUser.nickname);
  });

  it('should not update the user with invalid id', async () => {
    const clonedUser = structuredClone(user);

    (await request(app.getHttpServer())
      .post('/users')
      .send(clonedUser)
      .expect(201)) as { body: UserDTO & { id: string } };

    const userId = '12345';

    await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send(clonedUser)
      .expect(409);
  });

  it('should not update the user with existing email', async () => {
    const anotherUser = {
      email: 'john1.doe@example.com',
      name: 'john1',
      passwordHash: '12345',
      nickname: 'johnny',
      phone: '+2222222222',
      bio: null,
      role: 'user',
    } satisfies UserDTO;

    const response = (await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)) as { body: UserDTO & { id: string } };

    (await request(app.getHttpServer())
      .post('/users')
      .send(anotherUser)
      .expect(201)) as { body: UserDTO & { id: string } };

    const userId = response.body.id;

    await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send(anotherUser)
      .expect(409);
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
