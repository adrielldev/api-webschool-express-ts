import AppDataSource from "../../data-source";
import { Activities } from "../../entities/activities.entity";
import { Student } from "../../entities/students.entity";
import { AppError } from "../../errors/app.error";
import { IActivitieRequest } from "../../interfaces/activities/iindex";

const createActivitiesService = async (data: IActivitieRequest, typeLogin: string) => {
    const activitiesRepository = AppDataSource.getRepository(Activities)
    const studentRepository = AppDataSource.getRepository(Student)
    
    if(typeLogin === "student"){
        throw new AppError("Just teachers or schools can access this route", 403)
    }

    const { title, url, student } = data

    const findStudent = await studentRepository.findOneBy({email: student})
    if(!findStudent){
        throw new AppError("Cannot found this student", 404)
    }

    const newActivitie = activitiesRepository.create({
        title,
        url,
        student: [findStudent]
    })

    await activitiesRepository.save(newActivitie)

    const activity = await activitiesRepository.findOneBy({id: newActivitie.id})

    return activity
}

export default createActivitiesService