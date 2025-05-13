import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthResponse, AuthService } from './auth.service';
import { AuthUserDTO } from './dto/auth.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authUserDTO: AuthUserDTO): Promise<AuthResponse | void> {
    return this.authService.login(authUserDTO);
  }

  @Post('verify')
  @HttpCode(200)
  verify(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];

    return this.authService.verifyAccessToken(token);
  }
}
