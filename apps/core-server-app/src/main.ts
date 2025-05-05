import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  const options = new DocumentBuilder()
    .setTitle('Instagram Clone API')
    .setDescription('API for Instagram clone, focusing on user management.')
    .setVersion('1.0')
    .addServer('http://localhost:3000/api/v1', 'Local environment')
    .addTag('Users', 'Manage user accounts')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
