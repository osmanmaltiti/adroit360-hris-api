import { Request, Response } from 'express';
import { Manager, Review, User } from '../../schema/DBSchema';

export const appraiseReview = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { uid } = req.headers;

  Review.deleteOne({ _id: data._id }, {}, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    }
  });

  Manager.findOne({ _id: uid }, {}, async (err, results) => {
    if (err) res.status(400).json({ status: 'failed', message: 'error' });

    if (results) {
      User.findOne({ _id: data.employeeId }, {}, async (err, results) => {
        if (results) {
          if (data.objectiveType === 'development goal') {
            const removeTarget = results.developmentgoals.filter(
              (item) => item._id != data.developmentObjective._id
            );

            await User.updateOne(
              { _id: data.employeeId },
              { developmentgoals: [...removeTarget] }
            );
          } else {
            const removeTarget = results.performancegoals.filter(
              (item) => item._id != data.performanceObjective._id
            );

            await User.updateOne(
              { _id: data.employeeId },
              { performancegoals: [...removeTarget] }
            );
          }
        }
      });

      const updateHistory = await Manager.updateOne(
        { _id: uid },
        { history: [...results.history, data] }
      );

      res.status(200).json({ status: 'success', data: updateHistory });
    }
  });
};
