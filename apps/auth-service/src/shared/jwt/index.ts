import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { User } from '../../../../../packages/generated/prisma';

interface CustomJwtPayload extends JwtPayload {
  email: string;
}

function generateTokens(user: User): {
  accessToken: string;
  refreshToken: string;
} {
  const payload: CustomJwtPayload = {
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

export function verifyToken(token: string): CustomJwtPayload | null {
  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as CustomJwtPayload;

    return decoded;
  } catch {
    return null;
  }
}
