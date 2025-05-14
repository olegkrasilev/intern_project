import { Request, Response } from 'express';
import { verifyToken } from '../shared/jwt';
import { findUserByEmail } from '../service/login/login.service';

export async function verifyUser(request: Request, response: Response) {
  try {
    const token =
      request.headers['authorization']?.replace('Bearer ', '') ?? '';

    if (!token) {
      response.status(401);

      return;
    }

    const payload = verifyToken(token);

    if (payload) {
      const { email } = payload;
      const user = await findUserByEmail({ email });

      if (user) {
        response.status(200).json({
          name: user.name,
          email: user.email,
          nickname: user.nickname,
          phone: user.phone,
          role: user.role,
        });
      }
    } else {
      response.status(401).end();
    }
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.name === 'JsonWebTokenError' ||
        error.name === 'TokenExpiredError'
      ) {
        response.status(401).json({ message: 'Invalid or expired token' });
      } else {
        response.status(500).json({ message: error.message });
      }
    } else {
      response.status(500).end();
    }
  }
}
