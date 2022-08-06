import express from 'express';
import {
  createDevelopmentGoal,
  createPerformanceGoal,
} from '../controllers/objective/CreateObjective';
import { getFeedback } from '../controllers/objective/GetFeedback';
import { getGoal } from '../controllers/objective/GetObjective';
import { completeObjective } from '../controllers/objective/UpdateObjective';
import { submitReview } from '../controllers/user/Review';
import { authenticate } from '../middleware/VerifyToken';

const router = express.Router();

router.post('/create_development_goal', authenticate, createDevelopmentGoal);

router.post('/create_performance_goal', authenticate, createPerformanceGoal);

router.post('/complete_goal', authenticate, completeObjective);

router.post('/submit_review', authenticate, submitReview);

router.get('/get_goals', authenticate, getGoal);

router.get('/get_feedback', authenticate, getFeedback);

export default router;
