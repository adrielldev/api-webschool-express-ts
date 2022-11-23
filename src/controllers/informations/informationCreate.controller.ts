import { Request, Response } from "express";
import { informationCreateService } from "../../services/informations/informationCreate.service";

export const informationCreateController = async (
  req: Request,
  res: Response
) => {
  const { message } = req.body;
  const userType = req.user.type;

  const newInformation = await informationCreateService(message, userType);

  return res.status(201).json(newInformation);
};
