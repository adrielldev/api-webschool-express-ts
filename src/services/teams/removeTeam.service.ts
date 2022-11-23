import AppDataSource from "../../data-source";
import { AppError } from "../../errors/app.error";
import { Team } from "../../entities/teams.entiy";

const removeTeamService = async (type: string, teamId: string) => {
  const teamRepository = AppDataSource.getRepository(Team);

  if (type !== "school") {
    throw new AppError("User does not have permission", 403);
  }

  const team = await teamRepository.findOneBy({ id: teamId });

  if (!team) {
    throw new AppError("Team not found", 404);
  }

  await teamRepository.delete(teamId);

  return;
};

export default removeTeamService;
