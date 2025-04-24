import { UserRepository } from './repository/user.repository';
import { UserDTO } from './dto/user.dto';
import { CreateNewUserStrategy, ExistingUserStrategy } from './strategy/user.strategy';
import { User } from '@packages/database';
export declare class UserService {
    private readonly userRepository;
    private readonly createNewUserStrategy;
    private readonly existingUserStrategy;
    constructor(userRepository: UserRepository, createNewUserStrategy: CreateNewUserStrategy, existingUserStrategy: ExistingUserStrategy);
    createUser(userDTO: UserDTO): Promise<User | void>;
    getAllUsers(): Promise<User[]>;
    deleteUserById(id: Pick<User, 'id'>): Promise<User>;
}
