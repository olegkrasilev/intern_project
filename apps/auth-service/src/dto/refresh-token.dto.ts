import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
