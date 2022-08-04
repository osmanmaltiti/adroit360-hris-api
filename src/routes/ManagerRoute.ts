import express from 'express';
import { createManager } from '../controllers/manager/CreateManager';
import { getManager } from '../controllers/manager/GetManager';
import { getReviews } from '../controllers/manager/GetReviews';

const router = express.Router();

router.post('/login', getManager);

router.post('/signup', createManager);

router.get('/get_reviews', getReviews);

export default router;
