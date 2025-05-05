import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  IsEnum,
} from 'class-validator';
import { User } from '@packages/database';
import { UserRole } from '../../shared/constants/roles';
import { Sanitize } from '../../shared/utils/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

type UserWithoutAutoFieldsDTO = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'isDisabled'
>;

export class UserDTO implements UserWithoutAutoFieldsDTO {
  @ApiProperty({
    example: 'username',
  })
  @IsNotEmpty()
  @IsString()
  @Sanitize()
  name: string;

  @ApiProperty({
    example: 'username@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Sanitize()
  email: string;

  @ApiProperty({
    example: 'nickname',
  })
  @IsNotEmpty()
  @IsString()
  @Sanitize()
  nickname: string;

  @ApiProperty({
    example: '+3333333333',
  })
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid E.164 format',
  })
  @Sanitize()
  phone: string;

  @ApiProperty({
    example: '$2y$10$Xy/8uObm1tXpb1aEHevE..oyhB.XakGkfgdw1j43DF3I7aENRVglO',
  })
  @IsNotEmpty()
  @IsString()
  @Sanitize()
  passwordHash: string;

  @ApiProperty({
    example: 'someBio',
  })
  @IsOptional()
  @IsString()
  @Sanitize()
  bio: string | null;

  @ApiProperty({
    example: UserRole.USER,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  @Sanitize()
  role: string;
}
