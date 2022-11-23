import AppDataSource from "../../data-source";
import { Feedback } from "../../entities/feedbacks.entity";
import { AppError } from "../../errors/app.error";
import { IFeedbackUpdated, IUser } from "../../interfaces/feedback";

const updateFeedbackService = async (
  { id, type }: IUser,
  { feedback }: IFeedbackUpdated
): Promise<object | AppError> => {
  const feedbackRepository = AppDataSource.getRepository(Feedback);

  if (type === "student") {
    throw new AppError("You dont have permition");
  }

  const feedbackFind = await feedbackRepository.findOneBy({ id: id });

  if (!feedbackFind) {
    throw new AppError("Feedback not found", 404);
  }

  await feedbackRepository.update(id, { feedback: feedback });

  return { message: "Feedback updated" };
};

export default updateFeedbackService;
