import AppDataSource from "../../data-source";
import { Information } from "../../entities/informations.entity";
import { AppError } from "../../errors/app.error";

export const informationDeleteService = async (
  id: string,
  userType: string
) => {
  const informationRepository = AppDataSource.getRepository(Information);

  if (userType !== "school" && userType !== "teacher") {
    throw new AppError("User does not have permission", 403);
  }

  const information = await informationRepository.findOneBy({ id });

  if (!information) {
    throw new AppError("Information not found", 404);
  }

  await informationRepository.delete(id);

  return;
};
