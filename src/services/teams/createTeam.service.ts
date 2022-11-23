import AppDataSource from "../../data-source";
import { School } from "../../entities/school.entity";
import { Team } from "../../entities/teams.entiy";
import { AppError } from "../../errors/app.error";

const createTeamService = async (name: string, type: string, id: string): Promise<Team> => {
  const teamRepository = AppDataSource.getRepository(Team);
  const schoolRepository = AppDataSource.getRepository(School);

  if (type !== "school") {
    throw new AppError("User does not have permission", 403);
  }

  const teamAlreadyExists = await teamRepository.findOneBy({ name });
  const school = await schoolRepository.findOneBy({ id });

  if (!!teamAlreadyExists) {
    throw new AppError("Team already exists");
  }

  const newTeam = await teamRepository.save({
    name,
    school: school!,
  });

  const team = await teamRepository.findOneBy({
    id: newTeam.id,
  });

  return team!;
};

export default createTeamService;
