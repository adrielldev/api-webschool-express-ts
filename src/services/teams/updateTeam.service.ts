import AppDataSource from "../../data-source";
import { AppError } from "../../errors/app.error";
import { Team } from "../../entities/teams.entiy";

const updateTeamService = async (
  name: string,
  type: string,
  teamId: string
): Promise<Team> => {
  const teamRepository = AppDataSource.getRepository(Team);

  if (type !== "school") {
    throw new AppError("User does not have permission", 403);
  }

  const team = await teamRepository.findOneBy({ id: teamId });

  if (!team) {
    throw new AppError("Team not found", 404);
  }

  const nameAlreadyExists = await teamRepository.findOneBy({ name });

  if (nameAlreadyExists) {
    throw new AppError("Name already exists");
  }

  await teamRepository.update(teamId, { name: name || team.name });

  const updatedTeam = await teamRepository.findOneBy({ id: teamId });

  return updatedTeam!;
};

export default updateTeamService;
