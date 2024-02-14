import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Connection unsuccessful error: ${error.message}`);
  }
};

export default connectDB;
