import { UserDTO } from '../../dto/user.dto';
import { UserRepository } from '../../repository/user';

async function loginService({ email }: Pick<UserDTO, 'email'>) {
  const user = await UserRepository.findUserByEmail({ email });

  return user;
}

export { loginService };
