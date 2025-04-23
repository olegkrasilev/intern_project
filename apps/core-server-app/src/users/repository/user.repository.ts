import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@packages/database';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findUserByEmail({ email }: Pick<UserDTO, 'email'>) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: UserDTO): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
