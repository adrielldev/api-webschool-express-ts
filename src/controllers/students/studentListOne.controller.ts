import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import studentListOneService from "../../services/students/studentListOne.service";

const studentListOneController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const students = await studentListOneService(id);

  return res.status(200).json(instanceToPlain(students));
};

export default studentListOneController;
