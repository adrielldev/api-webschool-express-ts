import AppDataSource from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { AppError } from "../../errors/app.error";

const listTeacherByIDService = async (id: string) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const listTeacher = await teacherRepository.findOne({where:{ id },relations:{teams:true}});

  if (!listTeacher) {
    throw new AppError("Cannot find teacher with this ID", 404);
  }

  return listTeacher;
};

export default listTeacherByIDService;
