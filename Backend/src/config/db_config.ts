import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL as string);
    console.log(`Connected to Database`);
  }
  catch (error) {
    console.error("Failed in Connection to Database", error);
    process.exit(1);
  }
};

export default connectDB;
