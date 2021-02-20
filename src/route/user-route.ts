import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-services";


const route = Router()
const userService = new UserService()
const userController = new UserController(userService)
route.post('/register_user', userController.register)

export { route };