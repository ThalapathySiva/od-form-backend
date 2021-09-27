import { NextFunction, Request, Response, Router } from "express";
import * as jwt from 'jsonwebtoken';
import { UserController } from "../controllers/user-controller";
import { Admin } from "../models/admin-model";
import { Staff } from "../models/staff-model";
import { User } from "../models/user-model";
import { UserService } from "../services/user-services";


export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            let staff = await Staff.findOne({ _id: user['user_id'] })
            let student = await User.findOne({ _id: user['user_id'] })
            let admin = await Admin.findOne({ _id: user['user_id'] })
            if (staff == null && student == null && admin == null) {
                res.sendStatus(401)
                return
            }
            req.body.user = user
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
userRoute.get('/.well-known/apple-app-site-association',userController.appleAssociatedDomain)


export { userRoute };

