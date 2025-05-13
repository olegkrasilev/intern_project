/* eslint-disable @stylistic/member-delimiter-style */
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserDTO } from 'src/users/dto/user.dto';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  async login({
    email,
    password,
  }: Pick<UserDTO, 'email' | 'password'>): Promise<AuthResponse | void> {
    try {
      const url = process.env.BASE_AUTH_SERVICE_URL ?? '';

      const response = await fetch(`${url}/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        } satisfies Pick<UserDTO, 'email' | 'password'>),
      });

      if (!response.ok) {
        throw new HttpException('', 500);
      }

      const data: AuthResponse = await response
        .json()
        .then((json: AuthResponse) => {
          if (
            json &&
            typeof json.accessToken === 'string' &&
            typeof json.refreshToken === 'string'
          ) {
            return json;
          }

          throw new Error('Invalid response structure');
        });

      return data;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
