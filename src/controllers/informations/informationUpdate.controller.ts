import { Request, Response } from "express";
import { informationUpdateService } from "../../services/informations/informationUpdate.service";

export const informationUpdateController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const userType = req.user.type;
  const { message } = req.body;

  const newInformation = await informationUpdateService(id, message, userType);

  return res.status(200).json(newInformation);
};
