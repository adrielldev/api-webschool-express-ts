import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import responsibleListOneService from "../../services/responsibles/responsibleListOne.service";

const responsibleListOneController = async (req:Request,res:Response) => {

    const {id} = req.params

    const responsible = await responsibleListOneService(id);

    return res.status(200).json(instanceToPlain(responsible));



}


export default responsibleListOneController


