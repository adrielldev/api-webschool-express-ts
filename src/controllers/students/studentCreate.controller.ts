import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import studentCreateService from "../../services/students/studentCreate.service";

const studentCreateController = async (req: Request, res: Response) => {
  const { name, email, password, registration, shift, team } = req.body;
  const studentCreated = await studentCreateService({
    name,
    email,
    password,
    registration,
    shift,
    team,
  });

  return res.status(201).json(instanceToPlain(studentCreated));
};

export default studentCreateController;
