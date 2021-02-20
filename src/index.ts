import *as express from 'express';
import { route } from '../route/user_route';
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use('', route)

app.listen(process.env.PORT || 3000, () => console.log("server started"))