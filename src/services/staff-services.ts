import { Staff } from '../models/staff-model'
import { RegisterType, LoginType } from '../services/user-services';

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