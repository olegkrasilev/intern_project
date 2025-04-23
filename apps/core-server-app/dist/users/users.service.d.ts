import { UserRepository } from './repository/user.repository';
import { UserDTO } from './dto/user.dto';
import { CreateNewUserStrategy } from './strategy/user.strategy';
export declare class UserService {
    private readonly userRepository;
    private readonly createNewUserStrategy;
    constructor(userRepository: UserRepository, createNewUserStrategy: CreateNewUserStrategy);
    create(userDto: UserDTO): Promise<{
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
