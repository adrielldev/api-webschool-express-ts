import AppDataSource from "../../data-source"
import { Grades } from "../../entities/grades.entity"
import { Student } from "../../entities/students.entity"
import { AppError } from "../../errors/app.error"
import { IGradesRequest } from "../../interfaces/grades"

const createGradesService = async (data: IGradesRequest, typeLogin: string) => {
    if(typeLogin === "student"){
        throw new AppError("Just users Teachers and Schools can access this route", 403)
    }

    const gradeRepository = AppDataSource.getRepository(Grades)
    const studentRepository = AppDataSource.getRepository(Student)
        
    const { matter, grade, student } = data

    const findStudent = await studentRepository.findOneBy({email: student})
    if(!findStudent){
        throw new AppError("Does not exist this student", 404)
    }

    const newGrade = gradeRepository.create({
        matter,
        grade,
        student: [findStudent]
    })
    
    await gradeRepository.save(newGrade)
    
    return newGrade
}

export default createGradesService