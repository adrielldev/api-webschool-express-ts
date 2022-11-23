import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { schoolUpdateService } from "../../services/schools/schoolUpdate.service";

export const schoolUpdateController = async (req: Request, res: Response) => {
  const schoolData = req.body;
  const { id } = req.params;
  const userType = req.user.type;
  const userId = req.user.id;

  const newSchool = await schoolUpdateService(schoolData, id, userType, userId);

  return res.status(200).json(instanceToPlain(newSchool));
};
