import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@packages/database';
import { UserDTO } from 'src/users/dto/user.dto';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  async login({
    email,
    password,
  }: Pick<UserDTO, 'email' | 'password'>): Promise<AuthResponse | void> {
    try {
      const url = process.env.BASE_AUTH_SERVICE_URL ?? '';
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        } satisfies Pick<UserDTO, 'email' | 'password'>),
      });

      if (!response.ok) {
        throw new HttpException('', response.status);
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

  async verifyAccessToken(token: string) {
    const url = this.configService.get<string>('BASE_AUTH_SERVICE_URL', '');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(`${url}/verify`, {
        method: 'POST',
        headers,
      });

      if (!response.ok) {
        throw new HttpException('', response.status);
      }

      const data = (await response.json()) as Pick<
        User,
        'name' | 'email' | 'nickname' | 'phone' | 'role'
      >;

      return data;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
