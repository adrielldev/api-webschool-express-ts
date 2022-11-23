import AppDataSource from "../../data-source";
import { School } from "../../entities/school.entity";
import { Teacher } from "../../entities/teachers.entity";
import { AppError } from "../../errors/app.error";

export const schoolListOneService = async (id: string) => {
  const schoolRepository = AppDataSource.getRepository(School);

  const school = await schoolRepository.findOne({where:{id}, relations:["teams.teachers"]});

  if (!school) {
    throw new AppError("Invalid id", 404);
  }

  return school;
};
