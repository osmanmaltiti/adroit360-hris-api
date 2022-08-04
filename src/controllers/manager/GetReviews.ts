import { Request, Response } from 'express';
import { Review } from '../../schema/DBSchema';

export const getReviews = async (req: Request, res: Response) => {
  const { uid } = req.headers;

  const myReviews = await Review.find({ managerId: uid });

  if (myReviews) {
    res.status(200).json({ status: 'success', data: myReviews });
  }
};
