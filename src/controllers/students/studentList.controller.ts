import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import studentListService from "../../services/students/studentList.service";

const studentListController = async (req: Request, res: Response) => {
  const students = await studentListService();

  return res.status(200).send(instanceToPlain(students));
};

export default studentListController;
