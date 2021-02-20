require('dotenv').config()
import *as express from 'express';
import { route } from '../route/user_route'
import *as cors from 'cors'
import *as mongoose from 'mongoose'



const app = express()

/// Middlewares
app.use(express.json())
app.use(cors())


///DB
mongoose.connect(process.env.DEV_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
mongoose.connection.once("open", () => console.log("DB CONNECTED"))


/// Routes
app.use('', route)


/// Starting Server
app.listen(process.env.PORT || 3000, () => console.log("server started"))