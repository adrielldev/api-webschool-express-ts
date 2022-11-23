import { IResponsibleRequest } from "../../interfaces/responsibles";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/app.error";
import { Responsibles } from "../../entities/responsible.entity";
import bcrypt from "bcryptjs";
import { Student } from "../../entities/students.entity";

const responsibleCreateService = async ({
  name,
  email,
  password,
  studentEmail,
}: IResponsibleRequest) => {
  const responsiblesRepository = AppDataSource.getRepository(Responsibles);
  const studentRepository = AppDataSource.getRepository(Student);
  const emailAlreadyExists = await responsiblesRepository.findOneBy({ email });

  if (emailAlreadyExists) {
    throw new AppError("Email already exists", 400);
  }

  const student = await studentRepository.findOneBy({ email: studentEmail });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  password = bcrypt.hashSync(password, 10);
  const responsible = await responsiblesRepository.save({
    name,
    email,
    password,
    student: [student],
  });

  const createdResponsible = await responsiblesRepository.findOneBy({
    id: responsible.id,
  });

  return createdResponsible;
};

export default responsibleCreateService;
