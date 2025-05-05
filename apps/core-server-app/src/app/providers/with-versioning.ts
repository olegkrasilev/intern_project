import { INestApplication } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';

export const withVersioning = (app: INestApplication) => {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
};
