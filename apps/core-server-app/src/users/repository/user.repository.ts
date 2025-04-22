import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@packages/database';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
