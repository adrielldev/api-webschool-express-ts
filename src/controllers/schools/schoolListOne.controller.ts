import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { schoolListOneService } from "../../services/schools/schoolListOne.service";

export const schoolListOneController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const school = await schoolListOneService(id);

  return res.status(200).json(instanceToPlain(school));
};
