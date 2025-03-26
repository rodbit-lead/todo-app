import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connecting to MongoDB at:', process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: string | any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
