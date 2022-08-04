import { Request, Response } from 'express';
import { createToken } from '../../helpers/CreateToken';
import { Manager, User } from '../../schema/DBSchema';

export const createUser = async (req: Request, res: Response) => {
  const { email, fullname, password, role, managerId, manager } = req.body;

  if (email && password) {
    const newUser = new User({
      email,
      fullname,
      password,
      role,
      manager,
      managerId,
    });

    const createdUser = await newUser.save();

    Manager.findOne({ _id: managerId }, {}, async (err, results) => {
      if (err) {
        res.status(400).json({ status: 'failed', message: 'Error' });
      } else {
        if (results) {
          const { employees } = results;

          await Manager.updateOne(
            { _id: managerId },
            { employees: [...employees, createdUser] }
          );
        }
      }
    });

    const token = await createToken(createdUser.email, createdUser.role);

    res.status(200).json({ userdata: createdUser, token });
  }
};
