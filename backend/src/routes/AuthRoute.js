import { Router } from "express";
import { authController } from "../controllers/index.js";
import { validatePayload } from "../middlewares/index.js";
import { SignupSchema } from "../schemas/index.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validatePayload(SignupSchema),
  authController.signup
); // Middleware must be added
authRouter.post("/login", authController.login);
authRouter.post("/signout", authController.signout);
authRouter.get("/refresh", authController.refresh);
authRouter.get("/protected", authController.protectedRoute);

export default authRouter;
