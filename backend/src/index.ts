import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

mongoose.connect(process.env.MONGO_URI as string);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(7000, () => {
  console.log('server running on localhost:7000');
});
