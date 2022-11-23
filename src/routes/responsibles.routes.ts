import { Router } from "express";

import responsibleCreateController from "../controllers/responsibles/responsibleCreate.controller";
import responsibleDeleteController from "../controllers/responsibles/responsibleDelete.controller";
import responsibleListController from "../controllers/responsibles/responsibleList.controller";
import responsibleListOneController from "../controllers/responsibles/responsibleListOne.controller";
import responsibleUpdateController from "../controllers/responsibles/responsibleUpdate.controller";

import authenticationMiddleware from "../middlewares/authentication.middleware";

const routes = Router();

const responsibleRoutes = () => {
  routes.post("/", authenticationMiddleware, responsibleCreateController);
  routes.get("/", authenticationMiddleware, responsibleListController);
  routes.get("/:id", authenticationMiddleware, responsibleListOneController);
  routes.patch("/:id", authenticationMiddleware, responsibleUpdateController);
  routes.delete("/:id", authenticationMiddleware, responsibleDeleteController);

  return routes;
};

export default responsibleRoutes;
