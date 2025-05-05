import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const withSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Instagram Clone API')
    .setDescription('API for Instagram clone, focusing on user management.')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local environment')
    .addTag('Users', 'Manage user accounts')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
};
