import mongoose from "mongoose";
import envConfig from "./configs/envConfig.js";

const connectDB = async () => {
  try {
    const mongoURI = envConfig.DB.MONGO_URI;
    mongoose.connect(mongoURI, {
      dbName: envConfig.DB.DB_NAME,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection failed");
  }
};

export default connectDB;
