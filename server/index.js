import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const app = express();

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (err) {
    console.log(err);
  }
};

start();
