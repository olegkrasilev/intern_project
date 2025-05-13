import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
