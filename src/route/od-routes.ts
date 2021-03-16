import { Router } from "express";
import { ODController } from "../controllers/od-controller";
import { ODService } from "../services/od-services";
import { authenticateJWT } from "./user-route";


const odRoute = Router()
const odService = new ODService()
const odController = new ODController(odService)
odRoute.post('/create_od', authenticateJWT, odController.createOD)
odRoute.post('/update_od', authenticateJWT, odController.updateOD)
odRoute.get('/get_od', authenticateJWT, odController.getOD)
odRoute.get('/od_detail/:id', authenticateJWT, odController.odDetail)

export { odRoute };