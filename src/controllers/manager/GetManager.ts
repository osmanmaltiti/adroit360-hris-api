import { Request, Response } from 'express';
import { createToken } from '../../helpers/CreateToken';
import { Manager } from '../../schema/DBSchema';

export const getManager = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const currentUser = await Manager.findOne({ email });

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
};

export const getManagerProfile = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  const currentManager = await Manager.findOne({ _id: uid });

  if (currentManager) {
    res.status(200).json({ status: 'success', data: currentManager });
  }
};
