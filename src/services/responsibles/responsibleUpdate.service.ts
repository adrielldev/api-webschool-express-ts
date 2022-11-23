import AppDataSource from "../../data-source";
import { Responsibles } from "../../entities/responsible.entity";
import { AppError } from "../../errors/app.error";
import { IResponsibleRequest } from "../../interfaces/responsibles";
import bcrypt from "bcryptjs";

const responsibleUpdateService = async (
  { name, email, password, studentEmail }: IResponsibleRequest,
  id: string
) => {
  const responsiblesRepository = AppDataSource.getRepository(Responsibles);

  const responsible = await responsiblesRepository.findOneBy({ id });

  const emailExists = await responsiblesRepository.findOneBy({ email });

  if (!responsible) {
    throw new AppError("responsible not found", 404);
  }

  if (email !== responsible.email && emailExists) {
    throw new AppError("email updated already exists", 400);
  }

  const updatedResponsible = {
    name: name || responsible.name,
    email: email || responsible.email,
    password: bcrypt.hashSync(password, 10) || responsible.password,
  };

  await responsiblesRepository.update(id, updatedResponsible);

  const responsibleUpdated = await responsiblesRepository.findOneBy({ id });

  return responsibleUpdated;
};

export default responsibleUpdateService;
