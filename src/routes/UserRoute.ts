import express from 'express';
import { createUser } from '../controllers/user/CreateUser';
import { getProfile, getUser } from '../controllers/user/GetUser';
import { authenticate, authenticateManager } from '../middleware/VerifyToken';

const router = express.Router();

router.post('/login', getUser);

router.post('/signup', authenticateManager, createUser);

router.get('/get_profile', authenticate, getProfile);

export default router;
