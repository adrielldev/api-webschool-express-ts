import { Request, Response } from "express";
import studentDeleteService from "../../services/students/studentDelete.service";

const studentDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await studentDeleteService(id);

  return res.status(204).send();
};

export default studentDeleteController;
