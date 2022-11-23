import AppDataSource from "../../data-source";
import { Activities } from "../../entities/activities.entity";
import { AppError } from "../../errors/app.error";
import { IActivitieRequest } from "../../interfaces/activities/iindex";

const updateActivitiesService = async (data: IActivitieRequest, id: string) => {
    const activitiesRepository = AppDataSource.getRepository(Activities)

    const findActivity = await activitiesRepository.findOneBy({id})

    if(!findActivity){
        throw new AppError("Cannot found this Activity", 404)
    }

    const { title, url } = data


    findActivity.title = title || findActivity.title
    findActivity.url = url || findActivity.url

    await activitiesRepository.save(findActivity)

    const updatedActivitie = await activitiesRepository.findOneBy({id})

    return updatedActivitie
}

export default updateActivitiesService