import { User } from '../models/user-model'
import *as jwt from 'jsonwebtoken'
export class UserService {


    registerUser = async (requestData: RegisterType) => {
        try {
            let reqUser = new User({
                name: requestData.name,
                email: requestData.email,
                password: requestData.password,
            })
            let user = await reqUser.save()
            return { status: true, message: "User registered Successfully" }
        }
        catch (e) {
            console.log(e)
        }
    }



    loginUser = async (requestData: LoginType) => {
        try {
            let user = await User.findOne({ email: requestData.email })
            if (user == null) return { status: false, token: null }
            var token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET)
            return { status: true, token: token }
        }
        catch (e) {
            console.log(e)
        }
    }

    getUser = async () => {
        try {
            let getUser = await User.find()
            return { status: true, data: getUser }
        }
        catch (e) {
            console.log(e)
        }
    }

    getUserDetail = async () => {

    }

}

export type RegisterType = {
    name: string,
    password: string,
    email: string
}

export type LoginType = {
    email: String,
    password: String,
}