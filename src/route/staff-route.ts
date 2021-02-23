import { Router } from "express";
import { StaffController } from "../controllers/staff-controller";
import { StaffService } from "../services/staff-services";


const staffRoute = Router()
const staffService = new StaffService()
const staffController = new StaffController(staffService)
staffRoute.post('/register_staff', staffController.registerStaff)
staffRoute.get('/get_staff', staffController.getStaff)
staffRoute.post('/login_staff', staffController.loginStaff)


export { staffRoute };