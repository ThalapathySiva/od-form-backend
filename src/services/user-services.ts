import { User } from '../models/user-model'

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