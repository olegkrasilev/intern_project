import { Request, Response } from 'express';
import { validateOrReject, ValidationError } from 'class-validator';
import { AuthTokensDTO } from '../dto/refresh-token.dto';
import { generateTokens, verifyToken } from '../shared/jwt';
import { findUserByEmail } from '../service/login/login.service';

export async function refreshToken(
  request: Request<
    object,
    object,
    {
      accessToken: string;
      refreshToken: string;
    }
  >,
  response: Response,
) {
  try {
    const { accessToken, refreshToken } = request.body;

    const authTokensDTO = new AuthTokensDTO(accessToken, refreshToken);

    await validateOrReject(authTokensDTO);

    const decodedRefreshToken = verifyToken(refreshToken);
    const decodedAccessToken = verifyToken(accessToken);

    if (!decodedRefreshToken || !decodedAccessToken) {
      response.status(401).json({ message: 'Unauthorized' });

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
      response.status(401).json({ message: 'Unauthorized' });
    }

    response.status(500).json({ message: 'Iternal Server Error' });
  }
}
