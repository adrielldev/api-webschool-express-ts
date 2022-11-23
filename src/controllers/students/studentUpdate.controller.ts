import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import studentUpdateService from "../../services/students/studentUpdate.service";

const studentUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, registration, shift, team } = req.body;

  const updatedUser = await studentUpdateService(
    { name, email, password, registration, shift, team },
    id
  );

  return res.status(200).json(instanceToPlain(updatedUser));
};

export default studentUpdateController;
