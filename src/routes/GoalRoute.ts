import express from 'express';
import { getGoal } from '../controllers/goal/GetGoal';
import { submitReview } from '../controllers/goal/Submit_Review';
import { completeObjective } from '../controllers/goal/UpdateGoal';
import {
  createDevelopmentGoal,
  createPerformanceGoal,
} from './../controllers/goal/CreateGoal';

const router = express.Router();

router.post('/create_development_goal', createDevelopmentGoal);

router.post('/create_performance_goal', createPerformanceGoal);

router.post('/complete_goal', completeObjective);

router.post('/submit_review', submitReview);

router.get('/get_goals', getGoal);

export default router;
