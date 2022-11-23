import AppDataSource from "../../data-source";
import { Student } from "../../entities/students.entity";

const studentListService = async () => {
  const studentRepository = AppDataSource.getRepository(Student);
  const students = await studentRepository.find();

  return students;
};

export default studentListService;
