import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import { createToken } from '../../helpers/CreateToken';
import { comparePassword, encryptPassword } from '../../helpers/Encyption';
import { Manager, User } from '../../schema/DBSchema';

export const createUser = async (req: Request, res: Response) => {
  const { email, fullname, password, role } = req.body;
  const { uid } = req.headers;

  if (email && password) {
    const hashPassword = encryptPassword(password);

    Manager.findOne({ _id: uid }, {}, async (err, results) => {
      if (err) {
        res.status(400).json({ status: 'failed', message: 'Error' });
      } else {
        if (results) {
          const { employees } = results;
          try {
            const newUser = new User({
              role,
              email,
              fullname,
              managerId: uid,
              password: hashPassword,
              manager: results.fullname,
            });

            const createdUser = await newUser.save();

            await Manager.updateOne(
              { _id: uid },
              { employees: [...employees, createdUser] }
            );

            res.status(200).json({ status: 'success' });
          } catch (error) {
            res
              .status(400)
              .json({ status: 'failed', message: 'email already exists' });
          }
        }
      }
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const currentUser = await User.findOne({ email });

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
      res.status(401).send({ status: 'failed', message: error.message });
    }
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  try {
    const currentUser = await User.findOne({ _id: uid }).select({
      role: true,
      manager: true,
      fullname: true,
      managerId: true,
      developmentgoals: true,
      performancegoals: true,
    });

    if (currentUser) {
      const userData = {
        role: currentUser.role,
        manager: currentUser.manager,
        fullname: currentUser.fullname,
        managerId: currentUser.managerId,
        developmentgoals: currentUser.developmentgoals,
        performancegoals: currentUser.performancegoals,
      };

      res.status(200).json({ status: 'success', data: userData });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).send({ status: 'failed', message: error.message });
    }
  }
};
