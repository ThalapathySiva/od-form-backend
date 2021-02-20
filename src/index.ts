import *as express from 'express';
import { route } from '../route/user_route';


const app = express()

app.get('/', (req, res) => res.send("Helo"))
app.use('/user', route)

app.listen(3000, () => console.log("server started"))