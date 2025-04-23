import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateNewUserStrategy } from './strategy/user.strategy';
import { UserDTO } from './dto/user.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let app: INestApplication;

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
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user successfully and return status 201', async () => {
    const user: UserDTO = {
      id: '',
      name: 'John Doe',
      email: 'john.doe@example.com',
      nickname: 'John',
      phone: '+333',
      passwordHash: '',
      bio: null,
      isDisabled: false,
      role: 'user',
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null,
      username: '',
    };

    return await request(app.getHttpServer())
      .post('/ap1/v1/users')
      .send(user)
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});

// ### 1. **Тест на успешное создание пользователя**:
//    - **Цель**: Проверить, что при корректных данных сервер возвращает статус 201 (Created) и правильный объект пользователя.
//    - **Шаги**:
//      - Отправить валидные данные.
//      - Проверить статус 201.
//      - Проверить, что возвращённый объект соответствует созданному пользователю.

// ### 2. **Тест на ошибку при некорректных данных**:
//    - **Цель**: Проверить, что при некорректных данных (например, отсутствуют обязательные поля) сервер возвращает ошибку 400 (Bad Request).
//    - **Шаги**:
//      - Отправить данные с ошибками.
//      - Проверить статус 400.
//      - Проверить, что сообщение об ошибке корректно отражает проблему.

// ### 3. **Тест на обработку ошибки в сервисе (например, ошибка базы данных)**:
//    - **Цель**: Проверить, что если сервис выбрасывает ошибку (например, проблема с базой данных), сервер возвращает ошибку 500 (Internal Server Error).
//    - **Шаги**:
//      - Мокировать ошибку в сервисе.
//      - Проверить статус 500.
//      - Проверить сообщение об ошибке.

// ### 4. **Тест на валидацию обязательных полей**:
//    - **Цель**: Проверить, что если обязательные поля отсутствуют или некорректны, сервер возвращает ошибку 400 (Bad Request).
//    - **Шаги**:
//      - Отправить запрос с недостающими или некорректными обязательными полями.
//      - Проверить статус 400.
//      - Проверить, что ошибка указывает на недостающие поля.

// ### 5. **Тест на проверку корректности вызова метода сервиса**:
//    - **Цель**: Убедиться, что контроллер вызывает метод `create()` сервиса с правильными параметрами.
//    - **Шаги**:
//      - Отправить запрос с валидными данными.
//      - Проверить, что метод `create()` сервиса был вызван с правильными аргументами.

// Эти базовые тесты охватывают основные сценарии для создания пользователя через API.
