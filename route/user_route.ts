import { Router } from "express";

const route = Router()
route.get('/', (req, res) => res.send("Helo"))
route.get('/get_user', (request, response) => response.send("USers"))

export { route };