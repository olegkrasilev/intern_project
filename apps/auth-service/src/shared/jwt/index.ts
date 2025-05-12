import { JwtPayload, sign } from 'jsonwebtoken';
import { User } from '../../../../../packages/generated/prisma';

function generateTokens(user: User): {
  accessToken: string;
  refreshToken: string;
} {
  const payload: JwtPayload = {
    email: user.email,
  };

  const accessToken = sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: '1h',
  });

  const refreshToken = sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
}

export { generateTokens };
