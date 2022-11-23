import AppDataSource from "../../data-source";
import { Information } from "../../entities/informations.entity";
import { AppError } from "../../errors/app.error";

export const informationCreateService = async (
  message: string,
  userType: string
) => {
  const informationRepository = AppDataSource.getRepository(Information);

  if (userType !== "school" && userType !== "teacher") {
    throw new AppError("User does not have permission", 403);
  }

  const newInformation = await informationRepository.save({ message });

  const information = await informationRepository.findOneBy({
    id: newInformation.id,
  });

  return information;
};
