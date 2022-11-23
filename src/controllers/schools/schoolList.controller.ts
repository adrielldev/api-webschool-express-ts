import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { schoolListService } from "../../services/schools/schoolList.service";

export const schoolListController = async (req: Request, res: Response) => {
  const schools = await schoolListService();

  return res.status(200).json(instanceToPlain(schools));
};
