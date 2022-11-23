import { Request, Response } from "express";
import { schoolDeleteService } from "../../services/schools/schoolDelete.service";

export const schoolDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userType = req.user.type;
  const userId = req.user.id;

  await schoolDeleteService(id, userType, userId);

  return res.status(204).send();
};
