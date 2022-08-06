import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import { createToken } from '../../helpers/CreateToken';
import { comparePassword, encryptPassword } from '../../helpers/Encyption';
import { Manager } from '../../schema/DBSchema';

export const createManager = async (req: Request, res: Response) => {
  const { email, fullname, password, role } = req.body;

  if (email && password) {
    const hashPassword = encryptPassword(password);

    try {
      const newManager = new Manager({
        role,
        email,
        fullname,
        password: hashPassword,
      });

      const createdManager = await newManager.save();

      const token = await createToken(
        createdManager.email,
        createdManager.role
      );

      res
        .status(200)
        .json({ status: 'success', data: { uid: createdManager._id, token } });
    } catch (error) {
      if (error instanceof MongooseError) {
        res.status(400).json({ status: 'failed', message: error.message });
      }
    }
  }
};

export const getManager = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const currentUser = await Manager.findOne({ email });

    if (currentUser) {
      const verifyPassword = comparePassword(password, currentUser.password);

      if (verifyPassword) {
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
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }
};

export const getManagerProfile = async (req: Request, res: Response) => {
  const { uid } = req.headers;
  try {
    const currentManager = await Manager.findOne({ _id: uid });

    if (currentManager) {
      res.status(200).json({ status: 'success', data: currentManager });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }
};
