import *as express from 'express'
import { Response, Request } from 'express'
import { User } from '../models/user-model';
import { UserService } from '../services/user-services';

export class UserController {

    constructor(private service: UserService) { }


    register = async (req: Request, res: Response) => {
        const user: User = req.body;
        const registerResponse = await this.service.register(user)
        res.send(registerResponse)
    }

    login = async (req: Request, res: Response) => {

    }

    getUser = async (req: Request, res: Response) => {

    }

    getUserDetail = async (req: Request, res: Response) => {

    }
}