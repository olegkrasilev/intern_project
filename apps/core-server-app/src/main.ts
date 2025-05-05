import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { withGlobalFilters } from './app/providers/with-global-filter';
import { withHelmet } from './app/providers/with-helmet';
import { withValidation } from './app/providers/with-validation';
import { withVersioning } from './app/providers/with-versioning';
import { withSwagger } from './app/providers/with-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  withGlobalFilters(app);
  withHelmet(app);
  withValidation(app);
  withVersioning(app);
  withSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
