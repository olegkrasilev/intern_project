import { User } from '@packages/database';
export declare class UserDTO implements Omit<User, 'id'> {
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
}
