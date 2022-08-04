import { Request, Response } from 'express';
import { createToken } from '../../helpers/CreateToken';
import { Manager } from '../../schema/DBSchema';

export const createManager = async (req: Request, res: Response) => {
  const { email, fullname, password, role } = req.body;

  if (email && password) {
    const newManager = new Manager({
      email,
      fullname,
      password,
      role,
    });

    const createdManager = await newManager.save();

    const token = await createToken(createdManager.email, createdManager.role);
    res.status(200).json({ userdata: createdManager, token });
  }
};
