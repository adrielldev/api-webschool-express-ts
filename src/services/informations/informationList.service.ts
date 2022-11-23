import AppDataSource from "../../data-source";
import { Information } from "../../entities/informations.entity";
import { AppError } from "../../errors/app.error";

export const informationListService = async (userType: string) => {
  const informationRepository = AppDataSource.getRepository(Information);

  if (userType !== "school" && userType !== "teacher") {
    throw new AppError("User does not have permission", 403);
  }

  const informations = await informationRepository.find();

  return informations;
};
