import { Request, Response } from "express";
import { informationDeleteService } from "../../services/informations/informationDelete.service";

export const informationDeleteController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const userType = req.user.type;

  await informationDeleteService(id, userType);

  return res.status(204).send();
};
