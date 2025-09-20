import authRouter from "./AuthRoute.js";
import protectedRouter from "./ProtectedRoute.js";

const BASE_URL = "/api/v1";

const configureRoutes = (app) => {
  app.use(`${BASE_URL}/auth`, authRouter);
  app.use(`${BASE_URL}/`, protectedRouter);
};

export default configureRoutes;
