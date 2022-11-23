import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import responsibleListService from "../../services/responsibles/responsibleList.service";


const responsibleListController = async (req:Request,res:Response) => {


    const responsibles = await responsibleListService();



    return res.status(200).send(instanceToPlain(responsibles));

}

export default responsibleListController