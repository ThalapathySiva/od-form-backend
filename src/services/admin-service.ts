import { RegisterType, LoginType } from '../services/user-services';
import *as jwt from 'jsonwebtoken'
import { ValidateHelper } from '../utils/validate-helper';
import *as bcrypt from 'bcrypt'
import { Admin } from '../models/admin-model';

export class AdminService {

    registerAdmin = async (requestData: RegisterType) => {
        try {
            let registerValidateResponse = await ValidateHelper.validateRegisterType(requestData, false, true)
            if (!registerValidateResponse['status']) {
                return registerValidateResponse;
            }
            const saltRounds = 10;
            let passwordHash = bcrypt.hashSync(requestData.password, saltRounds);
            let reqadmin = new Admin({
                name: requestData.name,
                email: requestData.email,
                password: passwordHash,
                user_type: 'admin',
            })
            let admin = await reqadmin.save()
            return { status: true, message: "Admin registered Successfully" }
        }
        catch (e) {
            console.log(e)
        }
    }

    loginAdmin = async (requestData: LoginType) => {
        try {
            let loginValidateResponse = await ValidateHelper.loginValidateType(requestData, false, true)
            if (!loginValidateResponse['status']) {
                return loginValidateResponse;
            }
            let admin = loginValidateResponse['admin']
            var token = jwt.sign({ user_id: admin.id }, process.env.JWT_SECRET)
            return { status: true, token: token }
        }
        catch (e) {
            console.log(e)
        }
    }

}