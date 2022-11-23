import AppDataSource from "../../data-source";
import { Feedback } from "../../entities/feedbacks.entity";
import { AppError } from "../../errors/app.error";
import { IUser } from "../../interfaces/feedback";

const deleteFeedbackService = async ({ id, type }: IUser) => {
  const feedbackRepository = AppDataSource.getRepository(Feedback);

  const findFeedback = await feedbackRepository.findOneBy({ id });

  if (!findFeedback) {
    throw new AppError("Feedback not found", 404);
  }

  if (type === "student") {
    throw new AppError("You dont have permition", 403);
  }

  await feedbackRepository.delete(id);

  return;
};

export default deleteFeedbackService;
