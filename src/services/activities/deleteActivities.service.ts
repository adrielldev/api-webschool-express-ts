import AppDataSource from "../../data-source";
import { Activities } from "../../entities/activities.entity";
import { AppError } from "../../errors/app.error";

const deleteActivitiesService = async (id: string) => {
    const activitiesRepository = AppDataSource.getRepository(Activities)
    const findActivity = await activitiesRepository.findOneBy({id})

    if(!findActivity){
        throw new AppError("Cannot find this Activity", 404)
    }

    await activitiesRepository.remove(findActivity)

    return "Activity successfully removed"
}

export default deleteActivitiesService