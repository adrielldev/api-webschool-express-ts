import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { School } from "../../entities/school.entity";
import { AppError } from "../../errors/app.error";
import { ISchoolRequest } from "../../interfaces/schools";

export const schoolUpdateService = async (
  schoolData: ISchoolRequest,
  id: string,
  userType: string,
  userId: string
) => {
  const schoolRepository = AppDataSource.getRepository(School);
  const addressRepository = AppDataSource.getRepository(Address);
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

  const address = await addressRepository.findOneBy({
    id: school.address.id,
  });

  if (address && schoolData.address) {
    await addressRepository.update(address.id, {
      city: schoolData.address.city || address.city,
      state: schoolData.address.state || address.state,
      district: schoolData.address.district || address.district,
      number: schoolData.address.number || address.number,
      zipCode: schoolData.address.zipCode || address.zipCode,
    });
  }

  const hashedPassword = schoolData.password
    ? await hash(schoolData.password, 10)
    : school.password;

  await schoolRepository.update(id, {
    name: schoolData.name || school.name,
    email: schoolData.email || school.email,
    password: hashedPassword,
    director: schoolData.director || school.director,
  });

  const newSchool = await schoolRepository.findOneBy({ id });

  return newSchool;
};
