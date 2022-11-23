import { Request, Response } from "express";
import responsibleCreateService from "../../services/responsibles/responsibleCreate.service";
import { instanceToPlain } from "class-transformer";

const responsibleCreateController = async (req: Request, res: Response) => {
  const { name, email, password, studentEmail } = req.body;

  const responsibleCreated = await responsibleCreateService({
    name,
    email,
    password,
    studentEmail,
  });

  return res.status(201).json(instanceToPlain(responsibleCreated));
};

export default responsibleCreateController;
