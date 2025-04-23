import { UserRepository } from '../repository/user.repository';
import { UserDTO } from '../dto/user.dto';
import { User } from '@packages/database';
export declare class CreateNewUserStrategy {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(userDto: UserDTO): Promise<User>;
}
