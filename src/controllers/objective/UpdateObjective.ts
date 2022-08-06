import { Request, Response } from 'express';
import { User } from '../../schema/DBSchema';

export const completeObjective = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { uid } = req.headers;

  User.findOne({ _id: uid }, {}, async (err, results) => {
    if (err) {
      res.status(400).json({ status: 'failed', message: err.message });
    } else {
      if (results) {
        const { developmentgoals, performancegoals } = results;

        if (data.type === 'development goal') {
          const target = developmentgoals.find((item) => item._id == data.id);

          if (target) {
            const updateCompletion = {
              _id: target._id,
              type: target.type,
              fields: {
                ...target.fields,
                development: {
                  ...target.fields?.development,
                  status: 'completed',
                },
              },
            };

            const removeTarget = developmentgoals.filter(
              (item) => item._id != target._id
            );

            const ack = await User.updateOne(
              { _id: uid },
              { developmentgoals: [...removeTarget, updateCompletion] }
            );

            res.status(200).json({ status: 'success', data: ack });
          }
        } else {
          const target = performancegoals.find((item) => item._id == data.id);

          if (target) {
            const updateCompletion = {
              _id: target._id,
              type: target.type,
              fields: {
                ...target.fields,
                performance: {
                  ...target.fields?.performance,
                  status: 'completed',
                },
              },
            };

            const removeTarget = performancegoals.filter(
              (item) => item._id != target._id
            );

            const ack = await User.updateOne(
              { _id: uid },
              { performancegoals: [...removeTarget, updateCompletion] }
            );

            res.status(200).json({ status: 'success', data: ack });
          }
        }
      }
    }
  });
};
