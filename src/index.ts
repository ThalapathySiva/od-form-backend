require('dotenv').config()
import *as express from 'express';
import { userRoute } from './route/user-route'
import { staffRoute } from './route/staff-route'
import *as cors from 'cors'
import *as mongoose from 'mongoose'
import { odRoute } from './route/od-routes';
import { adminRoute } from './route/admin-routes';
import { upload } from './utils/file-helper';



const app = express()

/// Middlewares
app.use(express.json())
app.use(cors())

app.use(upload.any());



///DB
mongoose.connect(process.env.DEV_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})


mongoose.connection.once("open", () => console.log("DB CONNECTED"))

/// Routes
app.use('', userRoute)
app.use('', staffRoute)
app.use('', odRoute)
app.use('', adminRoute)




/// Starting Server
app.listen(process.env.PORT || 3000, () => console.log("server started"))