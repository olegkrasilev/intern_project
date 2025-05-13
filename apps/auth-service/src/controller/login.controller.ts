import { Request, Response } from 'express';
import { validateOrReject, ValidationError } from 'class-validator';
import { UserDTO } from '../dto/user.dto';
import { findUserByEmail } from '../service/login/login.service';
import bcrypt from 'bcrypt';
import { generateTokens } from '../shared/jwt';

export async function login(
  request: Request<object, object, UserDTO>,
  response: Response,
) {
  const password = request.body?.password || '';
  const email = request.body?.email || '';

  try {
    const userDto = new UserDTO(password, email);

    await validateOrReject(userDto);

    const user = await findUserByEmail({ email });

    if (!user) {
      response.status(401).json({ message: 'Unauthorized' });

      return;
    }

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatch) {
        response.status(401).json({ message: 'Unauthorized' });

        return;
      }

      const { accessToken, refreshToken } = generateTokens(user);

      response.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    if (Array.isArray(error) && error.at(0) instanceof ValidationError) {
      response.status(401).json({ message: 'Unauthorized' });

      return;
    }

    response.status(500).json({ message: 'Iternal Server Error' });
  }
}
