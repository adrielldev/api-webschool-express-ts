import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.Middleware";
import { teamSchema } from "../schemas/team.schema";

import {
  createTeamController,
  getOneTeamController,
  listTeamsController,
  removeTeamController,
  updateTeamController,
} from "../controllers/team/team.controller";

const router = Router();

const teamsRoutes = () => {
  router.post(
    "",
    validateSchemaMiddleware(teamSchema),
    authenticationMiddleware,
    createTeamController
  );
  router.get("/", authenticationMiddleware, listTeamsController);
  router.get("/:id", authenticationMiddleware, getOneTeamController);
  router.patch("/:id", authenticationMiddleware, updateTeamController);
  router.delete("/:id", authenticationMiddleware, removeTeamController);

  return router;
};

export default teamsRoutes;
