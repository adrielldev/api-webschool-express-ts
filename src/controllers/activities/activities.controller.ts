import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createActivitiesService from "../../services/activities/createActivities.service";
import deleteActivitiesService from "../../services/activities/deleteActivities.service";
import getActivitiesService from "../../services/activities/getActivities.service";
import updateActivitiesService from "../../services/activities/updateActivities.service";

const createActivitiesController = async (req: Request, res: Response) => {
  const newActivitie = await createActivitiesService(req.body, req.user.type);
  return res.status(201).json(instanceToPlain(newActivitie));
};

const deleteActivitiesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedActivitie = await deleteActivitiesService(id);
  return res.status(204).json(deletedActivitie);
};

const getActivitiesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listActivities = await getActivitiesService(id);
  return res.status(200).json(instanceToPlain(listActivities));
};

const updateActivitiesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedActivitie = await updateActivitiesService(req.body, id);
  return res.status(200).json(instanceToPlain(updatedActivitie));
};

export {
  createActivitiesController,
  deleteActivitiesController,
  getActivitiesController,
  updateActivitiesController,
};
