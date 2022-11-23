import { Router } from "express";

import studentCreateController from "../controllers/students/studentCreate.controller";
import studentListController from "../controllers/students/studentList.controller";
import studentListOneController from "../controllers/students/studentListOne.controller";
import studentUpdateController from "../controllers/students/studentUpdate.controller";
import studentDeleteController from "../controllers/students/studentDelete.controller";

import authenticationMiddleware from "../middlewares/authentication.middleware";

const router = Router();

const studentRoutes = () => {
  router.post("", authenticationMiddleware, studentCreateController);
  router.get("", authenticationMiddleware, studentListController);
  router.get("/:id", authenticationMiddleware, studentListOneController);
  router.patch("/:id", authenticationMiddleware, studentUpdateController);
  router.delete("/:id", authenticationMiddleware, studentDeleteController);
  return router;
};

export default studentRoutes;
