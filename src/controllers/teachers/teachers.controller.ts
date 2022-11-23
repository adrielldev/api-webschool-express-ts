import { Request, Response } from "express";
import createTeacherService from "../../services/teachers/createTeacher.service";
import deleteTeacherService from "../../services/teachers/deleteTeacher.service";
import listTeacherByIDService from "../../services/teachers/listTeacherByID.service";
import listTeacherService from "../../services/teachers/listTeachers.service";
import updateTeacherService from "../../services/teachers/updateTeacher.service";
import { instanceToPlain } from "class-transformer";

const createTeacherController = async (req: Request, res: Response) => {
  const newTeacher = await createTeacherService(req.body, req.user.type);
  return res.status(201).json(instanceToPlain(newTeacher));
};

const deleteTeacherController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteTeacherService(id, req.user.type);
  return res.status(204).json();
};

const listTeacherByIDController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listTeacherByID = await listTeacherByIDService(id);
  return res.status(200).json(instanceToPlain(listTeacherByID));
};

const listTeacherController = async (req: Request, res: Response) => {
  const type = req.user.type;
  const listTeachers = await listTeacherService(type);

  return res.status(200).json(instanceToPlain(listTeachers));
};

const updateTeacherController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTeacher = await updateTeacherService(req.body, id);
  return res.status(200).json(instanceToPlain(updatedTeacher));
};

export {
  createTeacherController,
  deleteTeacherController,
  listTeacherByIDController,
  listTeacherController,
  updateTeacherController,
};
