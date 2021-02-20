import { Router } from "express";

const route = Router()
route.get('/get_user', (request, response) => response.send("USers"))

export { route };