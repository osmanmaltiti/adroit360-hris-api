import express from 'express';
import { createUser } from '../controllers/user/CreateUser';
import { getUser } from '../controllers/user/GetUser';

const router = express.Router();

router.post('/login', getUser);

router.post('/signup', createUser);

export default router;
