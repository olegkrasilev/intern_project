import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { withProviders } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  withProviders(app);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
