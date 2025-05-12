/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable sonarjs/no-hardcoded-passwords */
import request from 'supertest';
import { app } from '../../app';
import { describe, it, beforeEach, afterEach } from '@jest/globals';
import bcrypt from 'bcrypt';
import { User } from '../../../../../packages/generated/prisma';
import prisma from '../../database';
import { API_VERSION_1, LOGIN_ROUTE } from '../../shared/constants';

const user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
  name: 'username',
  email: 'username@gmail.com',
  nickname: 'nickname',
  phone: '+3333333333',
  passwordHash: '',
  bio: 'someBio',
  role: 'user',
  isDisabled: false,
};

const url = `/${API_VERSION_1}/${LOGIN_ROUTE}`;

describe('POST /login', () => {
  it('should successfully login and return access and refresh tokens', async () => {
    const response = await request(app)
      .post(url)
      .send({
        email: 'username@gmail.com',
        password: '12345',
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(typeof response.body.accessToken).toBe('string');
    expect(typeof response.body.refreshToken).toBe('string');
  });

  it('should return 401 when password is incorrect, even if user exists', async () => {
    await request(app)
      .post(url)
      .send({
        email: 'username@gmail.com',
        password: '123456',
      })
      .expect(401);
  });

  it('should return 401 when user not found', async () => {
    await request(app)
      .post(url)
      .send({
        email: 'username1@gmail.com',
        password: '12345',
      })
      .expect(401);
  });

  it('should return 401 with invalid email', async () => {
    await request(app)
      .post(url)
      .send({
        email: 'username',
        password: '12345',
      })
      .expect(401);
  });

  it('should return 401 with invalid password', async () => {
    await request(app)
      .post(url)
      .send({
        email: 'username@gmail.com',
        password: '',
      })
      .expect(401);
  });

  it('should return 401 with missing field password', async () => {
    await request(app)
      .post(url)
      .send({
        email: 'username@gmail.com',
      })
      .expect(401);
  });

  it('should return 401 with missing field email', async () => {
    await request(app)
      .post(url)
      .send({
        password: '12345',
      })
      .expect(401);
  });
});

beforeEach(async () => {
  const hashedPassword = await bcrypt.hash('12345', 10);

  await prisma.user.create({
    data: {
      ...user,
      passwordHash: hashedPassword,
    },
  });
});

afterEach(async () => {
  await prisma.user.deleteMany();
});
