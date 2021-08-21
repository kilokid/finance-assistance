import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const app = express();

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
