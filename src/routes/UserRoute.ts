import express from 'express';
import { createUser, getProfile, getUser } from '../controllers/user/User';
import { authenticate, authenticateManager } from '../middleware/VerifyToken';

const router = express.Router();

router.post('/login', getUser);

//created by line manager
router.post('/signup', authenticateManager, createUser);

router.get('/get_profile', authenticate, getProfile);

export default router;
