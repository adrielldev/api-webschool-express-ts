import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/validateSchema.Middleware";
import { schemaFeedback, updateSchemaFeedback } from "../schemas/feedback.schema";
import {
  createFeedbackController,
  deleteFeedbackController,
  getFeedbackController,
  updatefeedbackController,
} from "../controllers/feedback/feedback.controller";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const router = Router();

const feedbackRoutes = () => {
  router.post(
    "",
    validateSchemaMiddleware(schemaFeedback),
    authenticationMiddleware,
    createFeedbackController
  );
  router.get("", authenticationMiddleware, getFeedbackController);
  router.patch("/:id", authenticationMiddleware, updatefeedbackController);
  router.delete("/:id", authenticationMiddleware, deleteFeedbackController);

  return router;
};

export default feedbackRoutes;
