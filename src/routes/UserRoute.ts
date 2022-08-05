import express from 'express';
import { createUser } from '../controllers/user/CreateUser';
import { getProfile, getUser } from '../controllers/user/GetUser';

const router = express.Router();

router.post('/login', getUser);

router.post('/signup', createUser);

router.get('/get_profile', getProfile);

export default router;
