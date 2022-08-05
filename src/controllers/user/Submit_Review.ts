import { Request, Response } from 'express';
import { Review, User } from '../../schema/DBSchema';

export const submitReview = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { uid } = req.headers;

  User.findOne({ _id: uid }, {}, async (err, results) => {
    if (err) res.status(400).json({ status: 'failed', message: 'error' });

    if (results) {
      const { managerId, fullname } = results;
      const newReview = new Review({
        score: 0,
        rating: 0,
        managerId,
        employee: fullname,
        appraise: 'false',
        employeeId: uid,
        objectiveType: data.type,
        developmentObjective: data.type === 'development goal' ? data : null,
        performanceObjective: data.type === 'performance goal' ? data : null,
      });

      await newReview.save();

      User.findOne({ _id: uid }, {}, async (err, results) => {
        if (results) {
          if (data.type === 'development goal') {
            const removeTarget = results.developmentgoals.filter(
              (item) => item._id != data._id
            );

            const ack = await User.updateOne(
              { _id: uid },
              { developmentgoals: [...removeTarget] }
            );

            res.status(200).json({ status: 'success', data: ack.acknowledged });
          } else {
            const removeTarget = results.performancegoals.filter(
              (item) => item._id != data._id
            );

            const ack = await User.updateOne(
              { _id: uid },
              { performancegoals: [...removeTarget] }
            );

            res.status(200).json({ status: 'success', data: ack.acknowledged });
          }
        }
      });
    }
  });
};
