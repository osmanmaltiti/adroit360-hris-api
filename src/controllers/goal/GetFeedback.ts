import { Request, Response } from 'express';
import { Manager, User } from '../../schema/DBSchema';

export const getFeedback = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  const currentUser = await User.findOne({ _id: uid });

  if (currentUser) {
    const manager = await Manager.findOne({ _id: currentUser.managerId });

    if (manager) {
      const { history } = manager;

      const userFeedbacks = history.filter((item) => item.employeeId === uid);

      res.status(200).json({ status: 'success', data: userFeedbacks });
    }
  }
};
