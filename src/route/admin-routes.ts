import { Router } from "express";
import { AdminController } from "../controllers/admin-controller";
import { AdminService } from "../services/admin-service";
import { authenticateJWT } from "./user-route";


const adminRoute = Router()
const adminService = new AdminService()
const adminController = new AdminController(adminService)
adminRoute.post('/register_admin', adminController.registerAdmin)
adminRoute.post('/login_admin', adminController.loginAdmin)


export { adminRoute };