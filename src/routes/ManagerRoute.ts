import express from 'express';
import {
  createManager,
  getManager,
  getManagerProfile,
} from '../controllers/manager/Manager';
import { appraiseReview, getReviews } from '../controllers/manager/Review';
import { authenticateManager } from '../middleware/VerifyToken';

const router = express.Router();

router.post('/login', getManager);

router.post('/signup', createManager);

router.post('/appraise_review', authenticateManager, appraiseReview);

router.get('/get_reviews', authenticateManager, getReviews);

router.get('/get_profile', authenticateManager, getManagerProfile);

export default router;
