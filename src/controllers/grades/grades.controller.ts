import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createGradesService from "../../services/grades/createGrades.service";
import deleteGradesService from "../../services/grades/deleteGrades.service";
import listGradesService from "../../services/grades/listGrades.service";
import updateGradesService from "../../services/grades/updateGrades.service";

const createGradesController = async (req: Request, res: Response) => {
  const grade = await createGradesService(req.body, req.user.type);
  return res.status(201).json(instanceToPlain(grade));
};

const deleteGradesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const grade = await deleteGradesService(id);
  return res.status(204).json(grade);
};

const listGradesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const grades = await listGradesService(id);
  return res.status(200).json(instanceToPlain(grades));
};

const updateGradesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const grade = await updateGradesService(req.body, id, req.user.type);
  return res.status(200).json(instanceToPlain(grade));
};

export {
  createGradesController,
  deleteGradesController,
  listGradesController,
  updateGradesController,
};
