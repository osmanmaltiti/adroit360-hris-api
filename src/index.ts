import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import goalRoute from './routes/GoalRoute';
import managerRoute from './routes/ManagerRoute';
import userRoute from './routes/UserRoute';

dotenv.config({
  path: './.env',
});

const port: number = Number(process.env.PORT) || 8080;
const app: Application = express();

mongoose.connect(
  String(process.env.MONGOCLIENT_PRODUCTION) ||
    String(process.env.MONGOCLIENT_LOCAL)
);

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/goal', goalRoute);
app.use('/api/v1/manager', managerRoute);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
