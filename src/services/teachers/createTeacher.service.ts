import AppDataSource from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { ITeachersRequest } from "../../interfaces/teachers";
import { AppError } from "../../errors/app.error";
import bcrypt from "bcryptjs";
import { Team } from "../../entities/teams.entiy";

const createTeacherService = async (
  data: ITeachersRequest,
  typeLogin: string
): Promise<Teacher> => {
  if (typeLogin !== "school") {
    throw new AppError("Just school can access this route", 403);
  }

  const teacherRepository = AppDataSource.getRepository(Teacher);

  const { name, email, password, shift, matter, teams } = data;

  const teamsRepository = AppDataSource.getRepository(Team);

  const verifyEmail = await teacherRepository.findOneBy({ email });
  if (verifyEmail) {
    throw new AppError("This e-mail is alredy in use");
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newTeacher = teacherRepository.create({
    name,
    email,
    password: hashedPassword,
    shift,
    matter,
    teams: []
  });

  for(let i = 0 ; i < teams.length ; i++){
    const verifyTeam = await teamsRepository.findOneBy({name:teams[i]});
    if (!verifyTeam) {
      throw new AppError("Team not found");
    }
    newTeacher.teams = [...newTeacher.teams, verifyTeam]
  }
  
  await teacherRepository.save(newTeacher)

  const retorno = await teacherRepository.findOne({
    where: { id: newTeacher.id },
    relations: { feedbacks: true, teams: true },
  });

  return retorno!;
};

export default createTeacherService;
