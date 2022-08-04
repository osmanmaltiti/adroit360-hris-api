import { Request, Response } from 'express';
import { User } from '../../schema/DBSchema';

export const getGoal = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  const currentUser = await User.findOne({ _id: uid });
  if (currentUser) {
    const goals = [
      ...currentUser.developmentgoals,
      ...currentUser.performancegoals,
    ];

    res.status(200).json({ status: 'success', data: goals });
  }
};
