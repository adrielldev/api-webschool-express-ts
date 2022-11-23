import { Router } from "express";

import { schoolCreateController } from "../controllers/schools/schoolCreate.controller";
import { schoolDeleteController } from "../controllers/schools/schoolDelete.controller";
import { schoolListController } from "../controllers/schools/schoolList.controller";
import { schoolListOneController } from "../controllers/schools/schoolListOne.controller";
import { schoolUpdateController } from "../controllers/schools/schoolUpdate.controller";

import authenticationMiddleware from "../middlewares/authentication.middleware";

const routes = Router();

const schoolRoutes = () => {
  routes.post("/", schoolCreateController);
  routes.get("/", schoolListController);
  routes.get("/:id", schoolListOneController);
  routes.patch("/:id", authenticationMiddleware, schoolUpdateController);
  routes.delete("/:id", authenticationMiddleware, schoolDeleteController);

  return routes;
};

export default schoolRoutes;
