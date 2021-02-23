import { Staff } from '../models/staff-model'
import { RegisterType, LoginType } from '../services/user-services';
import *as jwt from 'jsonwebtoken'

export class StaffService {

    registerStaff = async (requestData: RegisterType) => {
        try {
            let reqStaff = new Staff({
                name: requestData.name,
                email: requestData.email,
                password: requestData.password,
            })
            let staff = await reqStaff.save()
            return { status: true, message: "Staff registered Successfully" }
        }
        catch (e) {
            console.log(e)
        }
    }

    loginStaff = async (requestData: LoginType) => {
        try {
            let user = await Staff.findOne({ email: requestData.email })
            if (user == null) return { status: false, token: null }
            var token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET)
            return { status: true, token: token }
        }
        catch (e) {
            console.log(e)
        }
    }

    getStaff = async () => {
        try {
            let getStaff = await Staff.find()
            return { status: true, data: getStaff }
        }
        catch (e) {
            console.log(e)
        }
    }

    getUserDetail = async () => {

    }
}