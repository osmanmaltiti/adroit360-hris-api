import express from 'express';
import { getFeedback } from '../controllers/goal/GetFeedback';
import { getGoal } from '../controllers/goal/GetGoal';
import { completeObjective } from '../controllers/goal/UpdateGoal';
import { submitReview } from '../controllers/user/Submit_Review';
import { authenticate } from '../middleware/VerifyToken';
import {
  createDevelopmentGoal,
  createPerformanceGoal,
} from './../controllers/goal/CreateGoal';

const router = express.Router();

router.post('/create_development_goal', authenticate, createDevelopmentGoal);

router.post('/create_performance_goal', authenticate, createPerformanceGoal);

router.post('/complete_goal', authenticate, completeObjective);

router.post('/submit_review', authenticate, submitReview);

router.get('/get_goals', authenticate, getGoal);

router.get('/get_feedback', authenticate, getFeedback);

export default router;
