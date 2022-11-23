import AppDataSource from "../../data-source"
import { Grades } from "../../entities/grades.entity"
import { AppError } from "../../errors/app.error"


const listGradesService = async (id: string) => {
    const gradeRepository = AppDataSource.getRepository(Grades)
    const findGrade = await gradeRepository.findOneBy({id})
    if(!findGrade){
        throw new AppError("Cannot found this Grade", 404)
    }

    return findGrade
}

export default listGradesService