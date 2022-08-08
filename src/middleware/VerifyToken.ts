import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (authorization) {
    const bearerToken = authorization.split(' ');
    const [_, token] = bearerToken;

    jwt.verify(
      token,
      String(process.env.ACCESSTOKENLOCK),
      {},
      async (err, decode) => {
        if (err) {
          res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
        } else {
          if (decode) {
            const { role } = decode as { email: string; role: string };

            if (role === 'Employee') {
              next();
            }
          } else {
            res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
          }
        }
      }
    );
  } else {
    res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
  }
};

export const authenticateManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (authorization) {
    const bearerToken = authorization.split(' ');
    const [_, token] = bearerToken;

    jwt.verify(
      token,
      String(process.env.ACCESSTOKENLOCK),
      {},
      async (err, decode) => {
        if (err) {
          res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
        } else {
          if (decode) {
            const { role } = decode as { email: string; role: string };

            if (role === 'manager') {
              next();
            }
          } else {
            res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
          }
        }
      }
    );
  } else {
    res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
  }
};
