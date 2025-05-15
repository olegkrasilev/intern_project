import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const accesstoken = request.headers['authorization']?.replace(
      'Bearer ',
      '',
    );

    if (!accesstoken) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.authService.verifyAccessToken(accesstoken);

      return !!user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
