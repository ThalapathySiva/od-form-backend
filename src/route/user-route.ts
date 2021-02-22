import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-services";


const userRoute = Router()
const userService = new UserService()
const userController = new UserController(userService)
userRoute.post('/register_user', userController.register)
userRoute.get('/get_user', userController.getUser)


export { userRoute };