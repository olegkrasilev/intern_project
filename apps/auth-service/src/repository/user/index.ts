import prisma from '../../database';
import { UserDTO } from '../../dto/user.dto';

export const UserRepository = {
  async findUserByEmail({ email }: Pick<UserDTO, 'email'>) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
};
