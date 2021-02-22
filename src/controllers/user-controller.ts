import { Response, Request } from 'express'
import { User } from '../models/user-model';
import { RegisterType, UserService } from '../services/user-services';

export class UserController {

    constructor(private service: UserService) { }


    register = async (req: Request, res: Response) => {
        let reqData: RegisterType = req.body;
        const registerResponse = await this.service.registerUser(reqData)
        res.send(registerResponse)
    }

    login = async (req: Request, res: Response) => {

    }

    getUser = async (req: Request, res: Response) => {
        const getUserResponse = await this.service.getUser()
        res.send(getUserResponse)
    }

    getUserDetail = async (req: Request, res: Response) => {

    }
}