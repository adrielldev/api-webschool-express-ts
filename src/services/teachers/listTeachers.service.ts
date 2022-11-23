

import AppDataSource from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { AppError } from "../../errors/app.error";

const listTeacherService = async (type: string): Promise<Teacher[]> => {
  if (type !== "school") {
    throw new AppError("User does not have permission", 403);
  }

  const teacherRepository = AppDataSource.getRepository(Teacher);
  const listTeachers = await teacherRepository.find();

  return listTeachers;
};

export default listTeacherService;
