import { INestApplication, ValidationPipe } from '@nestjs/common';

export const withValidation = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
};
