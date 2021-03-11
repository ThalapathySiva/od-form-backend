import { Response, Request } from "express";
import { AdminService } from "../services/admin-service";
import { LoginType, RegisterType } from "../services/user-services";

export class AdminController {

    constructor(private service: AdminService) { }

    registerAdmin = async (req: Request, res: Response) => {
        let registerData: RegisterType = req.body;
        const registerResponse = await this.service.registerAdmin(registerData);
        res.send(registerResponse)
    }

    loginAdmin = async (req: Request, res: Response) => {
        let loginData: LoginType = req.body;
        const loginResponse = await this.service.loginAdmin(loginData);
        res.send(loginResponse)
    }
}