import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponse, AuthService } from './auth.service';
import { AuthUserDTO } from './dto/auth.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authUserDTO: AuthUserDTO): Promise<AuthResponse | void> {
    return this.authService.login(authUserDTO);
  }
}
