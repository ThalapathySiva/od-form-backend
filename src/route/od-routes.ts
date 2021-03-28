import { Router } from "express";
import { ODController } from "../controllers/od-controller";
import { ODService } from "../services/od-services";
import { authenticateJWT } from "./user-route";
import { upload } from "../utils/file-helper"
import { Od } from "../models/od-model";
import { createReadStream } from 'fs';



const odRoute = Router()
const odService = new ODService()
const odController = new ODController(odService)
odRoute.post('/create_od', authenticateJWT, odController.createOD)
odRoute.post('/update_od', authenticateJWT, odController.updateOD)
odRoute.get('/get_od', authenticateJWT, odController.getOD)
odRoute.get('/od_detail/:id', authenticateJWT, odController.odDetail)
odRoute.get('/get_od/files/:id', authenticateJWT, async (req, res) => {
    const od: any = await Od.findById(req.params.id)
    res.writeHead(200, { 'content-type': od.file_mime_type });
    createReadStream(od.file_url).pipe(res);

})

export { odRoute };