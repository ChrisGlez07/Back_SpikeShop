import 'dotenv/config';
import express from 'express';
import db from './Config/db.js';

const connectDB = db;
connectDB();
const app = express;
const port = process.env.PORT || 3000;