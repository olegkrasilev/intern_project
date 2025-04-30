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
import { Sanitize } from '../../shared/utils/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO implements Omit<User, 'id'> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Sanitize()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Sanitize()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Sanitize()
  nickname: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid E.164 format',
  })
  @Sanitize()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Sanitize()
  passwordHash: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Sanitize()
  bio: string | null;

  @IsBoolean()
  isDisabled: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  @Sanitize()
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
