import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { error } from './middlewares/error.js';

import { router } from './router/index.js';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(error);

const start = async () => {
  if (!process.env.DATABASE_URL) {
    console.log('Get database url from https://cloud.mongodb.com/v2/612104f5de540955eabc98da#clusters/connect?clusterId=Cluster0');
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (err) {
    console.log(err);
  }
};

start();
