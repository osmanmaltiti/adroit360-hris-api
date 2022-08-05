import { Request, Response } from 'express';
import { createToken } from '../../helpers/CreateToken';
import { User } from '../../schema/DBSchema';

export const getUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const currentUser = await User.findOne({ email });

  try {
    if (currentUser) {
      if (password === currentUser.password) {
        const token = await createToken(currentUser.email, currentUser.role);
        res
          .status(200)
          .json({ status: 'success', data: { uid: currentUser._id, token } });
      } else {
        res
          .status(400)
          .send({ status: 'failed', message: 'invalid username or password' });
      }
    }
  } catch (error) {}
};

export const getProfile = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  const currentUser = await User.findOne({ _id: uid });

  try {
    if (currentUser) {
      res.status(200).json({ status: 'success', data: currentUser });
    }
  } catch (error) {}
};
