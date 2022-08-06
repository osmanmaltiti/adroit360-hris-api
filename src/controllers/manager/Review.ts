import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import { Manager, Review } from '../../schema/DBSchema';

export const getReviews = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  try {
    const myReviews = await Review.find({ managerId: uid });

    if (myReviews) {
      res.status(200).json({ status: 'success', data: myReviews });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }
};

export const appraiseReview = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { uid } = req.headers;

  Review.deleteOne({ _id: data._id }, {}, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
  });

  Manager.findOne({ _id: uid }, {}, async (err, results) => {
    if (err) {
      res.status(400).json({ status: 'failed', message: err.message });
    } else {
      if (results) {
        const updateHistory = await Manager.updateOne(
          { _id: uid },
          { history: [...results.history, data] }
        );

        res.status(200).json({ status: 'success', data: updateHistory });
      }
    }
  });
};
