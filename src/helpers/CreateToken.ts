import jwt from 'jsonwebtoken';

export const createToken = async (
  email: string | undefined,
  role: string | undefined
) => {
  const accessToken = jwt.sign({ email, role }, 'hrisAccessToken', {
    expiresIn: '3d',
  });
  return accessToken;
};
