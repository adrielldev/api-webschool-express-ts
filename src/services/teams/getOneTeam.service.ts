import AppDataSource from "../../data-source";
import { AppError } from "../../errors/app.error";
import { Team } from "../../entities/teams.entiy";

const getOneTeamService = async (
  type: string,
  teamId: string
): Promise<Team> => {
  const teamRepository = AppDataSource.getRepository(Team);

  if (type !== "school") {
    throw new AppError("User does not have permission", 403);
  }

  const team = await teamRepository.findOne({where:{ id: teamId },relations:{teachers:true}});

  if (!team) {
    throw new AppError("Team not found", 404);
  }

  return team;
};

export default getOneTeamService;
