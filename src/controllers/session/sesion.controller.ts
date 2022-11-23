import { Request, Response } from "express";
import createSessionService from "../../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const dataLogin = req.body;
  const token = await createSessionService(dataLogin);

  return res.status(200).json({ token });
};

export default createSessionController;
