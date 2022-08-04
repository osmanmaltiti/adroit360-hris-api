import { Request, Response } from 'express';
import { Manager, Review } from '../../schema/DBSchema';

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
      const updateHistory = await Manager.updateOne(
        { _id: uid },
        { history: [...results.history, data] }
      );

      res.status(200).json({ status: 'success', data: updateHistory });
    }
  });
};
