import express from 'express';
import { appraiseReview } from '../controllers/manager/AppraiseReview';
import { createManager } from '../controllers/manager/CreateManager';
import {
  getManager,
  getManagerProfile,
} from '../controllers/manager/GetManager';
import { getReviews } from '../controllers/manager/GetReviews';
import { authenticateManager } from '../middleware/VerifyToken';

const router = express.Router();

router.post('/login', getManager);

router.post('/signup', createManager);

router.post('/appraise_review', authenticateManager, appraiseReview);

router.get('/get_reviews', authenticateManager, getReviews);

router.get('/get_profile', authenticateManager, getManagerProfile);

export default router;
