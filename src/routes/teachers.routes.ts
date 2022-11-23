import { Router } from "express";
import { teacherSchema } from "../schemas/teacher.schema";
import {
  createTeacherController,
  deleteTeacherController,
  listTeacherByIDController,
  listTeacherController,
  updateTeacherController,
} from "../controllers/teachers/teachers.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.Middleware";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const router = Router();

const teacherRoutes = () => {
  router.post(
    "",
    validateSchemaMiddleware(teacherSchema),
    authenticationMiddleware,
    createTeacherController
  );
  router.delete("/:id", authenticationMiddleware, deleteTeacherController);
  router.get("/:id", authenticationMiddleware, listTeacherByIDController);
  router.get("", authenticationMiddleware, listTeacherController);
  router.patch("/:id", authenticationMiddleware, updateTeacherController);

  return router;
};

export default teacherRoutes;
