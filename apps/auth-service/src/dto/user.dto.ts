import { User } from '../../../../packages/generated/prisma';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO implements Pick<User, 'email'> {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}
