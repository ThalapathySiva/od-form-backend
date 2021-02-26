import { User } from '../models/user-model'
import *as jwt from 'jsonwebtoken'
import { ValidateHelper } from '../utils/validate-helper'
import *as bcrypt from 'bcrypt'
export class UserService {

    registerUser = async (requestData: RegisterType) => {
        try {
            let registerValidateResponse = await ValidateHelper.validateRegisterType(requestData, false)
            if (!registerValidateResponse['status']) {
                return registerValidateResponse;
            }
            const saltRounds = 10;
            let passwordHash = bcrypt.hashSync(requestData.password, saltRounds);
            let reqUser = new User({
                name: requestData.name,
                email: requestData.email,
                password: passwordHash,
                user_type: 'student',
            })
            let user = await reqUser.save()
            return { status: true, error: "Student registered Successfully" }
        }
        catch (e) {
            console.log(e)
        }
    }



    loginUser = async (requestData: LoginType) => {
        try {
            let loginValidateResponse = await ValidateHelper.loginValidateType(requestData, false)
            if (!loginValidateResponse['status']) {
                return loginValidateResponse;
            }
            let user = loginValidateResponse['user']
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