import AppDataSource from "../../data-source";
import { Feedback } from "../../entities/feedbacks.entity";
import { Student } from "../../entities/students.entity";
import { Teacher } from "../../entities/teachers.entity";
import { AppError } from "../../errors/app.error";
import { IFeedbackRequest, IUser } from "../../interfaces/feedback";

const createFeedbackService = async (
  { feedback, name, email }: IFeedbackRequest,
  { id, type }: IUser
): Promise<object | AppError> => {
  const feedbackRepository = AppDataSource.getRepository(Feedback);
  const teacherRepository = AppDataSource.getRepository(Teacher);
  const studentRepository = AppDataSource.getRepository(Student);

  if (type === "student") {
    throw new AppError("You dont have permition", 403);
  }

  if (feedback === "" || feedback === undefined || feedback === null) {
    throw new AppError("Empty feedback");
  }

  const studentFind = await studentRepository.findOneBy({ email: email });

  const teacherFind = await teacherRepository.findOneBy({ id: id });

  if (!studentFind) {
    throw new AppError("Student not found", 404);
  }

  if (!teacherFind) {
    throw new AppError("teacher not found", 404);
  }

  const comentario = await feedbackRepository.save({
    student: studentFind,
    teacher: teacherFind,
    feedback,
    name,
  });

  return comentario;
};

export default createFeedbackService;
