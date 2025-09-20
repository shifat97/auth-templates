import { Router } from "express";
import { authController } from "../controllers/index.js";

const protectedRouter = Router();

protectedRouter.get("/protected", authController.protectedRoute);

export default protectedRouter;
