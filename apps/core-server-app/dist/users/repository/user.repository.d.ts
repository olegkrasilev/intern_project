import { PrismaService } from 'src/database/prisma.service';
import { User } from '@packages/database';
import { UserDTO } from '../dto/user.dto';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUserByEmail({ email }: Pick<UserDTO, 'email'>): Promise<{
        id: string;
        name: string;
        email: string;
        nickname: string;
        phone: string;
        passwordHash: string;
        bio: string | null;
        isDisabled: boolean;
        role: string;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    } | null>;
    createUser(data: UserDTO): Promise<User>;
}
