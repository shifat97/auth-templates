import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  PORT: process.env.PORT || 5000,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  DB: {
    MONGO_URI: process.env.MONGO_URI,
    DB_NAME: process.env.DB_NAME,
  },
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

export default envConfig;
