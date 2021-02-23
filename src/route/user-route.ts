import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-services";
import *as jwt from 'jsonwebtoken'


export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // @ts-ignore
            req.user = user
            next();
        });
    } else {
        res.sendStatus(401);
    }

}
const userRoute = Router()
const userService = new UserService()
const userController = new UserController(userService)
userRoute.post('/register_user', userController.register)
userRoute.get('/get_user', authenticateJWT, userController.getUser)
userRoute.post('/login_user', userController.login)




export { userRoute };