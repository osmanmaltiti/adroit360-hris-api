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
      const createReview = await newReview.save();
    }
  });
};
