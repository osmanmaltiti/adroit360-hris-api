import express from 'express';
import { appraiseReview } from '../controllers/manager/AppraiseReview';
import { createManager } from '../controllers/manager/CreateManager';
import {
  getManager,
  getManagerProfile,
} from '../controllers/manager/GetManager';
import { getReviews } from '../controllers/manager/GetReviews';

const router = express.Router();

router.post('/login', getManager);

router.post('/signup', createManager);

router.post('/appraise_review', appraiseReview);

router.get('/get_reviews', getReviews);

router.get('/get_profile', getManagerProfile);

export default router;
