import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const withHelmet = (app: INestApplication) => () => {
  app.use(helmet());
};
