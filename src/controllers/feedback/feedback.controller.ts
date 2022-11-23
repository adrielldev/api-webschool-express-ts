import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IFeedbackUpdated, IFeedbackRequest } from "../../interfaces/feedback";
import createFeedbackService from "../../services/feedbacks/createFeedback.service";
import deleteFeedbackService from "../../services/feedbacks/deleteFeedback.service";
import getFeedbackService from "../../services/feedbacks/getFeedback.service";
import updateFeedbackService from "../../services/feedbacks/updateFeedback.service";

const createFeedbackController = async (req: Request, res: Response) => {
  const { type } = req.user;
  const id = req.user.id;
  const { feedback, name, email }: IFeedbackRequest = req.body;
  const newFeedback = await createFeedbackService({ feedback, name, email }, { id, type });
  return res.status(201).json(instanceToPlain(newFeedback));
};
const getFeedbackController = async (req: Request, res: Response) => {
  const getFeedback = await getFeedbackService();
  return res.status(200).json(instanceToPlain(getFeedback));
};
const updatefeedbackController = async (req: Request, res: Response) => {
  const { type } = req.user;
  const { id } = req.params;
  const { feedback }: IFeedbackUpdated = req.body;
  const newFeedback = await updateFeedbackService({ id, type }, { feedback });
  return res.status(200).json(instanceToPlain(newFeedback));
};
const deleteFeedbackController = async (req: Request, res: Response) => {
  const { type } = req.user;
  const { id } = req.params;
  await deleteFeedbackService({ id, type });
  return res.status(204).json();
};

export {
  updatefeedbackController,
  createFeedbackController,
  getFeedbackController,
  deleteFeedbackController,
};
