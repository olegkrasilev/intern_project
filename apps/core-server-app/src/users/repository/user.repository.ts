import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma, User } from '@packages/database';
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

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async deleteUserById({ id }: Pick<User, 'id'>): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async updateUserById({ id }: Pick<User, 'id'>, data: UserDTO): Promise<User> {
    console.log(`Checking if user with ID ${id} exists before updating...`);

    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      console.log(`User with ID ${id} not found`);

      throw new NotFoundException(`User with ID ${id} not found`);
    }

    console.log(`Proceeding to update user with ID: ${id}`);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    console.log('User updated successfully:', updatedUser);

    return updatedUser;
  }
}
