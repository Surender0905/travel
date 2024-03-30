import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import myHotelRoutes from './routes/my-hotels';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

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
app.use('/api/my-hotels', myHotelRoutes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});
app.listen(7000, () => {
  console.log('server running on localhost:7000');
});
