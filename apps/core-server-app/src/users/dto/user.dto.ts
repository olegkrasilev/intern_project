import { User } from '@packages/database';

export class CreateUserDTO implements User {
  name: string;
  id: string;
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
