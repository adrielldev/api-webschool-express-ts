import AppDataSource from "../../data-source";
import { Team } from "../../entities/teams.entiy";
import { AppError } from "../../errors/app.error";

const listTeamsService = async (type: string) => {
  const teamRepository = AppDataSource.getRepository(Team);

  if (type !== "school") {
    throw new AppError("User does not have permission", 403);
  }

  const teamList = await teamRepository.find({relations:{teachers:true}});

  return teamList!;
};

export default listTeamsService;
