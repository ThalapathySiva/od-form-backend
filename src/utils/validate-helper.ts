import { Staff } from "../models/staff-model";
import { User } from "../models/user-model";
import { LoginType, RegisterType } from "../services/user-services";

export class ValidateHelper {
    static validateRegisterType = async (registerType: RegisterType, isStaff: Boolean) => {
        let isValidEmail = isStaff ? await Staff.find({ email: registerType.email }).countDocuments() : await User.find({ email: registerType.email }).countDocuments()
        if (registerType.name == null || registerType.email == null || registerType.password == null) {
            return { status: false, error: "Values can't be null" }
        }
        if (registerType.email.trim().length == 0 || registerType.name.trim().length == 0 || registerType.password.trim().length == 0) {
            return { status: false, error: "Values can't be empty" }
        }
        if (isValidEmail != 0) { return { status: false, error: "Mail already exists" } }
        return { status: true }
    }

    static loginValidateType = async (loginType: LoginType, isStaff: Boolean) => {
        if (loginType.email == null || loginType.password == null) {
            return { status: false, error: "Values can't be null" }
        }
        if (loginType.email.trim().length == 0 || loginType.password.trim().length == 0) {
            return { status: false, error: "Values can't be empty" }
        }
        let user = isStaff ? await Staff.findOne({ email: loginType.email }) : await User.findOne({ email: loginType.email })
        if (user == null) { return isStaff ? { status: false, error: "Staff not found" } : { status: false, error: "User not found" } }
        return isStaff ? { status: true, staff: user } : { status: true, user: user }
    }
}