import { Router } from "express";

import { informationCreateController } from "../controllers/informations/informationCreate.controller";
import { informationDeleteController } from "../controllers/informations/informationDelete.controller";
import { informationListController } from "../controllers/informations/informationList.controller";
import { informationListOneController } from "../controllers/informations/informationListOne.controller";
import { informationUpdateController } from "../controllers/informations/informationUpdate.controller";

import authenticationMiddleware from "../middlewares/authentication.middleware";

const routes = Router();

const informationRoutes = () => {
  routes.post("/", authenticationMiddleware, informationCreateController);
  routes.get("/", authenticationMiddleware, informationListController);
  routes.get("/:id", authenticationMiddleware, informationListOneController);
  routes.patch("/:id", authenticationMiddleware, informationUpdateController);
  routes.delete("/:id", authenticationMiddleware, informationDeleteController);

  return routes;
};

export default informationRoutes;
