import { Router } from "express";
import { authController } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/signup", authController.signup); // Middleware must be added
authRouter.post("/login", authController.login);
authRouter.get("/refresh", authController.refresh);
authRouter.get("/protected", authController.protectedRoute);

export default authRouter;
