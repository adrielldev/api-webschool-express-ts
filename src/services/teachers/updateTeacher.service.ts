import AppDataSource from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { AppError } from "../../errors/app.error";
import { ITeachersRequest } from "../../interfaces/teachers";
import bcrypt from "bcryptjs";

const updateTeacherService = async (data: ITeachersRequest, id: string) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);
  const updateTeacher = await teacherRepository.findOneBy({ id });

  if (updateTeacher?.id === undefined) {
    throw new AppError("Cannot find teacher with this ID", 404);
  }

  const { name, email, password, shift, matter } = data;

  if (password) {
    const comparePassaword = await bcrypt.compare(
      password,
      updateTeacher.password
    );

    if (!comparePassaword) {
      const newPassword = await bcrypt.hash(password, 10);
      updateTeacher.password = newPassword;
    }
  }

  updateTeacher.name = name || updateTeacher.name;
  updateTeacher.email = email || updateTeacher.email;
  updateTeacher.shift = shift || updateTeacher.shift;
  updateTeacher.matter = matter || updateTeacher.matter;

  await teacherRepository.update(id, updateTeacher);

  const relationFeedbacks = await teacherRepository.findOne({
    where: { id: updateTeacher.id },
    relations: { feedbacks: true },
  });

  return relationFeedbacks;
};

export default updateTeacherService;
