import { UsersService } from './users.service';
import { User } from '@packages/database';
import { CreateUserDTO } from './dto/user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(createUserDto: CreateUserDTO): Promise<User>;
}
