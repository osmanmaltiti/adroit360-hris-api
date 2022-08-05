import { Request, Response } from 'express';
import { Manager, User } from '../../schema/DBSchema';

export const createUser = async (req: Request, res: Response) => {
  const { email, fullname, password, role } = req.body;
  const { uid } = req.headers;

  if (email && password) {
    Manager.findOne({ _id: uid }, {}, async (err, results) => {
      if (err) {
        res.status(400).json({ status: 'failed', message: 'Error' });
      } else {
        if (results) {
          const { employees } = results;

          const newUser = new User({
            email,
            fullname,
            password,
            role,
            managerId: uid,
            manager: results.fullname,
          });

          const createdUser = await newUser.save();

          await Manager.updateOne(
            { _id: uid },
            { employees: [...employees, createdUser] }
          );

          res.status(200).json({ status: 'success' });
        }
      }
    });
  }
};
