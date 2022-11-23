import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import responsibleUpdateService from "../../services/responsibles/responsibleUpdate.service";

const responsibleUpdateController = async (req: Request, res: Response) => {
  const { name, email, password, studentEmail } = req.body;
  const { id } = req.params;

  const responsibleUpdated = await responsibleUpdateService(
    { name, email, password, studentEmail },
    id
  );

  return res.status(200).json(instanceToPlain(responsibleUpdated));
};

export default responsibleUpdateController;
