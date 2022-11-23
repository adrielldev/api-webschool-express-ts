import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { ISchoolRequest } from "../../interfaces/schools";
import { schoolCreateService } from "../../services/schools/schoolCreate.service";

export const schoolCreateController = async (req: Request, res: Response) => {
  const { name, email, password, director, address }: ISchoolRequest = req.body;

  const newSchool = await schoolCreateService({
    name,
    email,
    password,
    director,
    address,
  });

  return res.status(201).json(instanceToPlain(newSchool));
};
