import AppDataSource from "../../data-source";
import { Activities } from "../../entities/activities.entity";
import { AppError } from "../../errors/app.error";

const getActivitiesService = async (id: string) => {
    const activitiesRepository = AppDataSource.getRepository(Activities)
    const findActivity = await activitiesRepository.findOneBy({id})

    if(!findActivity){
        throw new AppError("Cannot found this Activity", 404)
    }

    return findActivity
}

export default getActivitiesService