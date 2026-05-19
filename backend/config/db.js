import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/leathercraft';
    await mongoose.connect(connString);
    console.log('✅ MongoDB connected successfully.');
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.error('Make sure MongoDB is running: https://www.mongodb.com/try/download/community');
    process.exit(1);
  }
};

export default connectDB;
