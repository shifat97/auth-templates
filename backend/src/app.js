import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import configureRoutes from "./routes/index.js";
import connectDB from "./db.js";
import { envConfig } from "./configs/index.js";

const app = express();

connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);

configureRoutes(app);

app.listen(envConfig.PORT, () => {
  console.log(`App is running or port: ${envConfig.PORT}`);
});
