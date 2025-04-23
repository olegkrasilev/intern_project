import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  Matches,
  IsDate,
  IsEnum,
} from 'class-validator';
import { User } from '@packages/database';
import { UserRole } from '../../shared/constants/roles';

export class UserDTO implements Omit<User, 'id'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid E.164 format',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  passwordHash: string;

  @IsOptional()
  @IsString()
  bio: string | null;

  @IsBoolean()
  isDisabled: boolean;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  role: string;

  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, {
    message: 'createdAt must be a valid ISO 8601 date string',
  })
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date | null;

  @IsOptional()
  @IsDate()
  deletedAt: Date | null;
}
