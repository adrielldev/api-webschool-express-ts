import AppDataSource from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { AppError } from "../../errors/app.error";

const deleteTeacherService = async (id: string, typeLogin: string) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  if (typeLogin !== "school") {
    throw new AppError("Just school can access this route", 403);
  }

  const deletedTeacher = await teacherRepository.findOneBy({ id });

  if (!deletedTeacher) {
    throw new AppError("Cannot find teacher with this ID", 404);
  }

  await teacherRepository.remove(deletedTeacher);

  return deletedTeacher;
};

export default deleteTeacherService;
