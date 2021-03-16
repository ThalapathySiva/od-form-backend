import { Request, Response } from "express";
import { CreateODType, ODService } from "../services/od-services";

export class ODController {

    constructor(private service: ODService) { }

    createOD = async (req: Request, res: Response) => {
        let reqData: CreateODType = req.body;
        const createOdResponse = await this.service.createOD(reqData)
        res.send(createOdResponse)
    }

    updateOD = async (req: Request, res: Response) => {
        let reqData: CreateODType = req.body;
        const updateOdResponse = await this.service.updateOD(reqData)
        res.send(updateOdResponse)
    }

    getOD = async (req: Request, res: Response) => {
        let reqData: CreateODType = req.body;
        const getUserResponse = await this.service.getOD(reqData)
        res.send(getUserResponse)
    }

    odDetail = async (req: Request, res: Response) => {
        let id: string = req.params.id
        const odDetailResponse = await this.service.odDetail(id)
        res.send(odDetailResponse)
    }

}