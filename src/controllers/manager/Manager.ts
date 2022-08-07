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
      res
        .status(400)
        .json({ status: 'failed', message: 'email already exists' });
    }
  }
};

export const getManager = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const currentUser = await Manager.findOne({ email });

    if (currentUser) {
      const verifyPassword = comparePassword(
        password,
        String(currentUser.password)
      );

      if (verifyPassword) {
        const token = await createToken(currentUser.email, currentUser.role);
        res
          .status(200)
          .json({ status: 'success', data: { uid: currentUser._id, token } });
      } else {
        res
          .status(401)
          .send({ status: 'failed', message: 'invalid username or password' });
      }
    } else {
      res
        .status(401)
        .send({ status: 'failed', message: 'invalid username or password' });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(401).json({ status: 'failed', message: error.message });
    }
  }
};

export const getManagerProfile = async (req: Request, res: Response) => {
  const { uid } = req.headers;
  try {
    const currentManager = await Manager.findOne({ _id: uid }).select({
      role: true,
      history: true,
      fullname: true,
      employees: true,
    });

    if (currentManager) {
      const managerData = {
        role: currentManager.role,
        history: currentManager.history,
        fullname: currentManager.fullname,
        employees: currentManager.employees,
      };

      res.status(200).json({ status: 'success', data: managerData });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }
};
