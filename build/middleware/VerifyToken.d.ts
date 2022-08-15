import { NextFunction, Request, Response } from 'express';
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
export declare const authenticateManager: (req: Request, res: Response, next: NextFunction) => void;
