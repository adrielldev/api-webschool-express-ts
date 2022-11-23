import { Router } from "express";
import { sessionSchema } from "../schemas/session.schema";

import createSessionController from "../controllers/session/sesion.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.Middleware";

const router = Router();

const sessionRoutes = () => {
  router.post("", validateSchemaMiddleware(sessionSchema), createSessionController);

  return router;
};

export default sessionRoutes;
