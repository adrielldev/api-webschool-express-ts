import AppDataSource from "../../data-source"
import { Responsibles } from "../../entities/responsible.entity"
import { AppError } from "../../errors/app.error";

const responsibleDeleteService = async (id:string) => {

    const responsibleRepository = AppDataSource.getRepository(Responsibles);

    const responsible = await responsibleRepository.findOne({
        where:{id}
    })

    if(!responsible){
        throw new AppError('responsible not found',404);

    }

    await responsibleRepository.delete(id)

}

export default responsibleDeleteService
