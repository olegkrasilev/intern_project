import { User } from '@packages/database';

export class UserDTO implements User {
  id: string;
  name: string;
  nickname: string;
  phone: string;
  passwordHash: string;
  bio: string | null;
  isDisabled: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  username: string;
  email: string;
  password: string;
}
