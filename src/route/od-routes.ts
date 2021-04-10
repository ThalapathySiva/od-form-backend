import { Router } from "express";
import { ODController } from "../controllers/od-controller";
import { ODService } from "../services/od-services";
import { authenticateJWT } from "./user-route";
import { Od } from "../models/od-model";
import { createReadStream } from 'fs';



const odRoute = Router()
const odService = new ODService()
const odController = new ODController(odService)
odRoute.post('/create_od', authenticateJWT, odController.createOD)
odRoute.post('/update_od', authenticateJWT, odController.updateOD)
odRoute.get('/get_od', authenticateJWT, odController.getOD)
odRoute.get('/od_detail/:id', authenticateJWT, odController.odDetail)
odRoute.get('/get_od/brochure/:id', authenticateJWT, async (req, res) => {
    const od: any = await Od.findById(req.params.id)
    res.writeHead(200, { 'content-type': od.brochure_file_mime_type });
    createReadStream(od.brochure_file_url).pipe(res);

})
odRoute.get('/get_od/certificate/:id', authenticateJWT, async (req, res) => {
    const od: any = await Od.findById(req.params.id)
    res.writeHead(200, { 'content-type': od.certificate_file_mime_type });
    createReadStream(od.certificate_file_url).pipe(res);
})

export { odRoute };