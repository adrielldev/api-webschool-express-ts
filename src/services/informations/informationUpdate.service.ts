import AppDataSource from "../../data-source";
import { Information } from "../../entities/informations.entity";
import { AppError } from "../../errors/app.error";

export const informationUpdateService = async (
  id: string,
  message: string,
  userType: string
) => {
  const informationRepository = AppDataSource.getRepository(Information);

  if (userType !== "school" && userType !== "teacher") {
    throw new AppError("User does not have permission", 403);
  }

  const information = await informationRepository.findOneBy({ id });

  if (!information) {
    throw new AppError("Invalid id", 404);
  }

  await informationRepository.update(id, { message });

  const newInformation = await informationRepository.findOneBy({ id });

  return newInformation;
};
