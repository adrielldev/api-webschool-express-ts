import AppDataSource from "../../data-source";
import { Student } from "../../entities/students.entity";
import { AppError } from "../../errors/app.error";
import { IStudentRequest } from "../../interfaces/students";
import bcrypt from "bcryptjs";
import { Team } from "../../entities/teams.entiy";

const studentUpdateService = async (
  { name, email, password, shift, team, registration }: IStudentRequest,
  id: string
) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const teamRepository = AppDataSource.getRepository(Team);
  const student = await studentRepository.findOneBy({ id });
  const emailExists = await studentRepository.findOneBy({ email });
  const teamAlreadyExists = await teamRepository.findOneBy({ name: team });

  if (!teamAlreadyExists) {
    throw new AppError("Team not found", 404);
  }

  if (!student) {
    throw new AppError("Invalid id", 404);
  }

  if (email !== student.email && emailExists) {
    throw new AppError("Email already exists", 400);
  }

  const updatedUser = {
    name: name || student.name,
    email: email || student.email,
    password: bcrypt.hashSync(password, 10) || student.password,
    shift: shift || student.shift,
    team: teamAlreadyExists || student.team,
    registration: registration || student.registration,
  };

  await studentRepository.update(id, updatedUser);

  const userUpdated = await studentRepository.findOneBy({ id });

  return userUpdated;
};

export default studentUpdateService;
