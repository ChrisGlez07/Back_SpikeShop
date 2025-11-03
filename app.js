import 'dotenv/config';
import express from 'express';
import db from './src/Config/db.js';
import userRoutes from './src/Routes/user.route.js';
import { generateTokenGeneric } from './src/Helpers/auth.js';

const connectDB = db;
connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.listen(port, () => {
    console.log('Generando token generico:');
    console.log(generateTokenGeneric())
    console.log(`Server is running on port ${port}`);
});
