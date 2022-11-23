import AppDataSource from "../../data-source";
import { AppError } from "../../errors/app.error";
import { ISessionRequest } from "../../interfaces/sessions";
import { School } from "../../entities/school.entity";
import { Student } from "../../entities/students.entity";
import { Teacher } from "../../entities/teachers.entity";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async (
  dataLogin: ISessionRequest
): Promise<string> => {
  const schoolRepository = AppDataSource.getRepository(School);
  const teacherRepository = AppDataSource.getRepository(Teacher);
  const studentRepository = AppDataSource.getRepository(Student);

  const school = await schoolRepository.find();
  const teacher = await teacherRepository.find();
  const student = await studentRepository.find();

  const user = [...school, ...teacher, ...student].find(
    (user) => user.email === dataLogin.email
  );

  if (!user) {
    throw new AppError("Invalid email or password");
  }

  const matchPassword = await compare(dataLogin.password, user.password);

  if (!matchPassword) {
    throw new AppError("Invalid email or password 0000");
  }

  const token = jwt.sign(
    {
      type: user.type,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};

export default createSessionService;
