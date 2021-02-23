import { Response, Request } from "express";
import { StaffService } from "../services/staff-services";
import { LoginType, RegisterType } from "../services/user-services";

export class StaffController {

    constructor(private service: StaffService) { }

    registerStaff = async (req: Request, res: Response) => {
        let registerData: RegisterType = req.body;
        const registerResponse = await this.service.registerStaff(registerData);
        res.send(registerResponse)
    }

    loginStaff = async (req: Request, res: Response) => {
        let loginData: LoginType = req.body;
        const loginResponse = await this.service.loginStaff(loginData);
        res.send(loginResponse)
    }

    getStaff = async (req: Request, res: Response) => {
        const getStaffResponse = await this.service.getStaff()
        res.send(getStaffResponse)
    }
}