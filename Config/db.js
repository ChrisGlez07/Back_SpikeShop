import 'dotenv/config';
import mongoose from 'mongoose';

const { USER, PASSWORD, CLUSTER } = process.env;

if (!USER || !PASSWORD || !CLUSTER) {
    console.error('Variables de MongoDB no definidas en .env');
    process.exit(true);
}

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}/?retryWrites=true&w=majority&appName=Chris`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB conectado: ${conn.connection.host}`);
        console.log(`Base de datos: ${conn.connection.name}`);
        
        return conn;
    } catch (error) {
        console.error(`Error de conexión: ${error.message}`);
        process.exit(1);
    }
};
export default connectDB;