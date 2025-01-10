import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
dotenv.config();

const connectDB = async () => {
  const db_url = process.env.DB_URI;
  try {
    await mongoose.connect(db_url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
