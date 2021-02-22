import { Response, Request } from "express";
import { StaffService } from "../services/staff-services";
import { RegisterType } from "../services/user-services";

export class StaffController {

    constructor(private service: StaffService) { }

    registerStaff = async (req: Request, res: Response) => {
        let registerData: RegisterType = req.body;
        const registerResponse = await this.service.registerStaff(registerData);
        res.send(registerResponse)
    }

    loginStaff = async (req: Request, res: Response) => {

    }

    getStaff = async (req: Request, res: Response) => {
        const getStaffResponse = await this.service.getStaff()
        res.send(getStaffResponse)
    }

    getStaffDetail = async (req: Request, res: Response) => {

    }
}