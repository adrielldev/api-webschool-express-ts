import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { School } from "../../entities/school.entity";
import { AppError } from "../../errors/app.error";
import { ISchoolRequest } from "../../interfaces/schools";

export const schoolCreateService = async ({
  name,
  email,
  password,
  director,
  address,
}: ISchoolRequest) => {
  const schoolRepository = AppDataSource.getRepository(School);
  const addressRepository = AppDataSource.getRepository(Address);

  const hashedPassword = await hash(password, 10);

  const emailExists = await schoolRepository.findOneBy({ email });

  if (emailExists) {
    throw new AppError("Email already exists", 400);
  }

  const addressExists = await schoolRepository.findOneBy({ address });

  if (addressExists) {
    throw new AppError("Address already exists", 400);
  }

  if (address.state.length > 2) {
    throw new AppError("State with more than 2 digits", 400);
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Zip code with more than 8 digits", 400);
  }

  const newAddress = await addressRepository.save({
    city: address.city,
    state: address.state,
    district: address.district,
    number: address.number,
    zipCode: address.zipCode,
  });

  const newSchool = await schoolRepository.save({
    name,
    email,
    password: hashedPassword,
    director,
    address: newAddress,
  });

  const school = await schoolRepository.findOneBy({ id: newSchool.id });

  return school;
};
