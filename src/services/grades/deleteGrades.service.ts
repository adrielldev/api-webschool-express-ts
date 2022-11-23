import AppDataSource from "../../data-source"
import { Grades } from "../../entities/grades.entity"
import { AppError } from "../../errors/app.error"

const deleteGradesService = async (id: string) => {
    const gradeRepository = AppDataSource.getRepository(Grades)
    const findGrade = await gradeRepository.findOneBy({id})

    if(!findGrade){
        throw new AppError("Cannot found this grades", 404)
    }

    await gradeRepository.remove(findGrade)
    return "Grades successfully removed"
}

export default deleteGradesService