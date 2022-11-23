import { Request, Response } from "express";
import { informationListService } from "../../services/informations/informationList.service";

export const informationListController = async (
  req: Request,
  res: Response
) => {
  const userType = req.user.type;

  const informations = await informationListService(userType);

  return res.status(200).json(informations);
};
