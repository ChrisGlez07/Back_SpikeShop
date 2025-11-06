import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './src/Config/db.js';
import userRoutes from './src/Routes/user.route.js';
import productoRoutes from './src/Routes/producto.route.js';
import { generateTokenGeneric } from './src/Helpers/auth.js';


const connectDB = db;
connectDB();
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning', 'Cache-Control', 'Pragma'],
  credentials: true,
  preflightContinue: false, 
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/users', userRoutes);
app.use('/productos', productoRoutes);

app.listen(port, () => {
    console.log('Generando token generico:');
    console.log(generateTokenGeneric())
    console.log(`Server is running on port ${port}`);
});



