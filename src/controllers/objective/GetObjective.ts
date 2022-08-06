import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import { Manager, User } from '../../schema/DBSchema';

export const getGoal = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  try {
    const currentUser = await User.findOne({ _id: uid });
    if (currentUser) {
      const goals = [
        ...currentUser.developmentgoals,
        ...currentUser.performancegoals,
      ];

      res.status(200).json({ status: 'success', data: goals });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }
};

export const getFeedback = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  try {
    const currentUser = await User.findOne({ _id: uid });

    if (currentUser) {
      const manager = await Manager.findOne({ _id: currentUser.managerId });

      if (manager) {
        const { history } = manager;

        const userFeedbacks = history.filter((item) => item.employeeId === uid);

        res.status(200).json({ status: 'success', data: userFeedbacks });
      }
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }
};
