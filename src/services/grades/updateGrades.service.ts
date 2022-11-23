import AppDataSource from "../../data-source"
import { Grades } from "../../entities/grades.entity"
import { Student } from "../../entities/students.entity"
import { AppError } from "../../errors/app.error"
import { IGradesRequest } from "../../interfaces/grades"

const updateGradesService = async (data: IGradesRequest, id: string, typeLogin: string) => {
    if(typeLogin === "student"){
        throw new AppError("Just users Teachers and Schools can access this route", 403)
    }

    const gradeRepository = AppDataSource.getRepository(Grades)
    const studentRepository = AppDataSource.getRepository(Student)
    const findGrade = await gradeRepository.findOneBy({id})

    if(!findGrade){
        throw new AppError("Cannot found this Grade", 404)
    }

    const { matter, grade, student } = data

    const findStudent = await studentRepository.findOneBy({email: student})
    
    if(!findStudent){
        throw new AppError("Cannot found this Student", 404)
    }

    findGrade.matter = matter || findGrade.matter
    findGrade.grade = grade || findGrade.grade
    findGrade.student = [findStudent] || findGrade.student

    await gradeRepository.save(findGrade)

    const updatedGrade = await gradeRepository.findOneBy({id})

    return updatedGrade
}

export default updateGradesService