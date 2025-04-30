import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password using bcrypt.
 *
 * This function generates a salt and hashes the provided password
 * using the bcrypt algorithm. The number of salt rounds can be adjusted
 * via the `SALT_ROUNDS` constant. The resulting hash includes the salt,
 * making each hash unique even if the same password is used multiple times.
 *
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password string.
 *
 * @example
 * const hashed = await hashPassword('mySecret123');
 * console.log(hashed); // => $2b$10$...
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}
