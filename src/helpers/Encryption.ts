import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const encryptPassword = (password: string) => {
  const saltRounds = 8;
  const genSalt = genSaltSync(saltRounds);
  const encryptedPassword = hashSync(password, genSalt);

  return encryptedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  const compare = compareSync(password, hashedPassword);

  return compare;
};
