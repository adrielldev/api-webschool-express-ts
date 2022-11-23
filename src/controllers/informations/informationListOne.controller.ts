import { Request, Response } from "express";
import { informationListOneService } from "../../services/informations/informationListOne.service";

export const informationListOneController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const userType = req.user.type;

  const information = await informationListOneService(id, userType);

  return res.status(200).json(information);
};
