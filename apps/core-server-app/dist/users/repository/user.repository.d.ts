import { PrismaService } from 'src/database/prisma.service';
import { User } from '@packages/database';
import { CreateUserDTO } from '../dto/user.dto';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(data: CreateUserDTO): Promise<User>;
}
