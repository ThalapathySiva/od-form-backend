import { Router } from "express";

const route = Router()
route.get('/get_user', (req, res) => res.send("USers"))

export { route };