import { Router } from "express";
import { activitiesSchema } from "../schemas/activities.schema";

import { createActivitiesController, 
        deleteActivitiesController,
        getActivitiesController,
        updateActivitiesController
} from "../controllers/activities/activities.controller";      
import authenticationMiddleware from "../middlewares/authentication.middleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.Middleware";

const router = Router()

const activitiesRouters = () => {
    router.post("/", validateSchemaMiddleware(activitiesSchema), authenticationMiddleware, createActivitiesController)
    router.delete("/:id", authenticationMiddleware, deleteActivitiesController)
    router.get("/:id", authenticationMiddleware, getActivitiesController)
    router.patch("/:id", authenticationMiddleware, updateActivitiesController)

    return router
}

export default activitiesRouters