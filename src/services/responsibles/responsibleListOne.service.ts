import AppDataSource from "../../data-source";
import { Responsibles } from "../../entities/responsible.entity";
import { AppError } from "../../errors/app.error";

const responsibleListOneService = async (id: string) => {
  const responsibleRepository = AppDataSource.getRepository(Responsibles);

  const responsible = await responsibleRepository.findOne({
    where: { id },
    relations: ["student", "student.grades", "student.activities"],
  });

  if (!responsible) {
    throw new AppError("responsible not found", 404);
  }

  return responsible;
};

export default responsibleListOneService;
