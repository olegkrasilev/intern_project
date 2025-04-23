import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

// 1. **Проверка вызова сервиса**: "должен вызывать userService.create с переданным DTO"
// 2. **Проверка статуса**: "POST /users должен возвращать 201 Created"
// 3. **Валидация тела запроса**: "должен возвращать 400 при отсутствии поля email"
// 4. **Формат ответа**: "должен возвращать объект с полями id, name, email"
// 5. **Обработка ошибок**: "должен возвращать 409 при дубликате email"
// 6. **Маршрутизация**: "POST /users должен вызывать createUser"
// 7. **Проксирование данных**: "должен возвращать результат сервиса без изменений"
