import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDTO } from './dto/auth.user.dto';
import { Response } from 'express';
import { setAuthCookies } from '../../shared/utils/cookies';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authUserDTO: AuthUserDTO, @Res() response: Response) {
    const tokens = await this.authService.login(authUserDTO);
    const ACCESS_TOKEN = 'accessToken';
    const REFRESH_TOKEN = 'refreshToken';
    if (tokens && ACCESS_TOKEN in tokens && REFRESH_TOKEN in tokens) {
      const { accessToken, refreshToken } = tokens;

      setAuthCookies(response, accessToken, refreshToken);

      return response.status(200).json();
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  @Post('verify')
  @HttpCode(200)
  verify(@Headers('authorization') authHeader: string) {
    const BEARER = 'Bearer ';
    if (!authHeader || !authHeader.startsWith(BEARER)) {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];

    return this.authService.verifyAccessToken(token);
  }

  @Post('refresh-token')
  async refreshToken(
    @Headers('authorization') authHeader: string,
    @Res() response: Response,
  ) {
    const BEARER = 'Bearer ';
    if (!authHeader || !authHeader.startsWith(BEARER)) {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }

    const currentRefreshToken = authHeader.split(' ')[1];
    const tokens = await this.authService.refreshToken(currentRefreshToken);
    const ACCESS_TOKEN = 'accessToken';
    const REFRESH_TOKEN = 'refreshToken';
    if (tokens && ACCESS_TOKEN in tokens && REFRESH_TOKEN in tokens) {
      const { accessToken, refreshToken } = tokens;

      setAuthCookies(response, accessToken, refreshToken);

      return response.status(200).json();
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
