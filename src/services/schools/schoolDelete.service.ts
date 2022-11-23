import AppDataSource from "../../data-source";
import { School } from "../../entities/school.entity";
import { AppError } from "../../errors/app.error";

export const schoolDeleteService = async (
  id: string,
  userType: string,
  userId: string
) => {
  const schoolRepository = AppDataSource.getRepository(School);

  const school = await schoolRepository.findOneBy({ id });

  if (!school) {
    throw new AppError("School not found", 404);
  }

  if (userId !== id) {
    throw new AppError("User does not have permission", 403);
  }

  if (userType !== "school") {
    throw new AppError("User does not have permission", 403);
  }

  await schoolRepository.delete(id);

  return;
};
