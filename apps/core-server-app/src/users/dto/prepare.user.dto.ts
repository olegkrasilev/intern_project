import { hashPassword } from '../../shared/utils/bcrypt';
import { UserDTO } from './user.dto';

/**
 * Prepares a copy of the given UserDTO by securely hashing the password.
 *
 * This function clones the input UserDTO object to avoid side effects or unintended mutations.
 * It then checks if the `passwordHash` field contains a plain-text password (not already hashed),
 * and securely hashes it using bcrypt.
 *
 * @param {UserDTO} userDTO - The original user data transfer object, which may contain a plain-text password.
 * @returns {Promise<UserDTO>} A new UserDTO object with the passwordHash securely hashed.
 *
 */
export async function prepareUserDTO(userDTO: UserDTO): Promise<UserDTO> {
  const userDTOClone = structuredClone(userDTO);

  userDTOClone.passwordHash = await hashPassword(userDTOClone.passwordHash);

  return userDTOClone;
}
