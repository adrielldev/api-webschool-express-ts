import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createTeamService from "../../services/teams/createTeam.service";
import getOneTeamService from "../../services/teams/getOneTeam.service";
import listTeamsService from "../../services/teams/lisTeams.service";
import removeTeamService from "../../services/teams/removeTeam.service";
import updateTeamService from "../../services/teams/updateTeam.service";

const createTeamController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const type = req.user.type;
  const id = req.user.id;
  const team = await createTeamService(name, type, id);

  return res.status(201).json(team);
};

const listTeamsController = async (req: Request, res: Response) => {
  const type = req.user.type;
  const teamList = await listTeamsService(type);

  return res.status(200).json(instanceToPlain(teamList));
};

const getOneTeamController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const type = req.user.type;
  const team = await getOneTeamService(type, id);

  return res.status(200).json(instanceToPlain(team));
};

const updateTeamController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;
  const type = req.user.type;
  const team = await updateTeamService(name, type, id);

  return res.status(200).json(instanceToPlain(team));
};

const removeTeamController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const type = req.user.type;
  await removeTeamService(type, id);

  return res.status(204).send();
};

export {
  createTeamController,
  listTeamsController,
  getOneTeamController,
  updateTeamController,
  removeTeamController,
};
