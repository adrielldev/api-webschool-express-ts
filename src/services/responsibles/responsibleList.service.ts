import AppDataSource from "../../data-source";
import { Responsibles } from "../../entities/responsible.entity";

export const responsibleListService = async () => {
  const responsibleRepository = AppDataSource.getRepository(Responsibles);
  const responsibles = await responsibleRepository.find({
    relations: { student: true },
  });
  return responsibles;
};

export default responsibleListService;
