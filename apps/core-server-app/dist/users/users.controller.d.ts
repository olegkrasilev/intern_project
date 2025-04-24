import { UserService } from './users.service';
import { User } from '@packages/database';
import { UserDTO } from './dto/user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDTO: UserDTO): Promise<User | void>;
    getAllUsers(): Promise<User[]>;
    deleteUser({ id }: Pick<User, 'id'>): Promise<{
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
