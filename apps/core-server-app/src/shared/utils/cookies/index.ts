import { Response } from 'express';

export function setAuthCookies(
  response: Response,
  accessToken: string,
  refreshToken: string,
) {
  response.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: Number.parseInt(process.env.ACCESS_TOKEN_EXPIRATION!, 10),
  });

  response.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: Number.parseInt(process.env.REFRESH_TOKEN_EXPIRATION!, 10),
  });
}
