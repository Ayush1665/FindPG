import mongoose from 'mongoose';

const connectDB = async() => {
  try {
    const conn=await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.error("Error connection to Database",error.message);
    process.exit(1);    // 1 -> failure   0 -> success
  }
}

export default connectDB;