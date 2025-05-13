import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '@packages/database';
import { Sanitize } from '../../../shared/utils/class-transformer';

export class AuthUserDTO implements Pick<User, 'email'> {
  @IsNotEmpty()
  @IsEmail()
  @Sanitize()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Sanitize()
  password: string;
}
