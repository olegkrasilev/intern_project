import { Request, Response } from 'express';
import { validateOrReject, ValidationError } from 'class-validator';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';
import { generateTokens, verifyToken } from '../shared/jwt';
import { findUserByEmail } from '../service/login/login.service';

export async function refreshToken(
  request: Request<
    object,
    object,
    {
      refreshToken: string;
    }
  >,
  response: Response,
) {
  try {
    const { refreshToken } = request.body;

    const authTokensDTO = new RefreshTokenDTO(refreshToken);

    await validateOrReject(authTokensDTO);

    const decodedRefreshToken = verifyToken(refreshToken);

    if (!decodedRefreshToken) {
      response.status(401).json();

      return;
    }

    const { email } = decodedRefreshToken;
    const user = await findUserByEmail({ email });

    if (user) {
      const { accessToken, refreshToken } = generateTokens(user);

      response.status(200).json({
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    if (Array.isArray(error) && error.at(0) instanceof ValidationError) {
      response.status(401).json();

      return;
    }

    response.status(500).json();
  }
}
