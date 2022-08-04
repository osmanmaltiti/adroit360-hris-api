import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import goalRoute from './routes/GoalRoute';
import managerRoute from './routes/ManagerRoute';
import userRoute from './routes/UserRoute';

const app: Application = express();

mongoose.connect('mongodb://localhost:27017/hrisDB');

app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/manager', managerRoute);
app.use('/api/v1/goal', goalRoute);

app.listen(5000, () => console.log('Server is listening to port 5000'));
