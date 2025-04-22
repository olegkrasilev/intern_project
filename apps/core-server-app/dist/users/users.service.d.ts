import { UserRepository } from './repository/user.repository';
import { CreateUserDTO } from './dto/user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserDTO): Promise<{
        name: string;
        id: string;
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
    }>;
}
