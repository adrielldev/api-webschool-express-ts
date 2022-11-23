import { Request, Response } from "express";
import responsibleDeleteService from "../../services/responsibles/responsibleDelete.service";




const responsibleDeleteController = async (req:Request,res:Response) => {

    const {id} = req.params

    await responsibleDeleteService(id);
    


    return res.status(204).send()


}


export default responsibleDeleteController