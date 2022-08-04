import { Request, Response } from 'express';
import { User } from '../../schema/DBSchema';

export const createDevelopmentGoal = async (req: Request, res: Response) => {
  const { developmentGoal } = req.body;
  const { uid } = req.headers;

  const currentUser = await User.findOne({ _id: uid });
  if (currentUser) {
    const newDevGoal = await User.updateOne(
      { _id: uid },
      { developmentgoals: [...currentUser.developmentgoals, developmentGoal] }
    );

    res.status(200).json({ status: 'success', data: newDevGoal });
  }
};

export const createPerformanceGoal = async (req: Request, res: Response) => {
  const { performanceGoal } = req.body;
  const { uid } = req.headers;

  const currentUser = await User.findOne({ _id: uid });
  if (currentUser) {
    const newDevGoal = await User.updateOne(
      { _id: uid },
      { performancegoals: [...currentUser.performancegoals, performanceGoal] }
    );

    res.status(200).json({ status: 'success', data: newDevGoal });
  }
};
