import { UserService } from './users.service';
import { User } from '@packages/database';
import { UserDTO } from './dto/user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: UserDTO): Promise<User | void>;
}
