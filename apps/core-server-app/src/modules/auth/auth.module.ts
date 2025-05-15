import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards/auth';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
