import { Router } from "express";
import { gradesSchema } from "../schemas/grades.schema";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.Middleware";
import { createGradesController, deleteGradesController, listGradesController, updateGradesController } from "../controllers/grades/grades.controller";

const router = Router()

const gradesRouters = () => {
    router.post("/", validateSchemaMiddleware(gradesSchema), authenticationMiddleware, createGradesController)
    router.delete("/:id", authenticationMiddleware, deleteGradesController)
    router.get("/:id", authenticationMiddleware, listGradesController)
    router.patch("/:id", authenticationMiddleware, updateGradesController)

    return router
}

export default gradesRouters