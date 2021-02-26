import { Od } from "../models/od-model";
import { Staff } from "../models/staff-model";
import { User } from "../models/user-model";
import { CreateODType } from "../services/od-services";
import { LoginType, RegisterType } from "../services/user-services";
import *as bcrypt from 'bcrypt'
export class ValidateHelper {
    static validateRegisterType = async (registerType: RegisterType, isStaff: Boolean) => {
        let isValidEmail = isStaff ? await Staff.find({ email: registerType.email }).countDocuments() : await User.find({ email: registerType.email }).countDocuments()
        if (registerType.name == null) {
            return { status: false, error: "Name field is required" }
        }
        if (registerType.email == null) {
            return { status: false, error: "Email field is required" }
        }
        if (registerType.password == null) {
            return { status: false, error: "Password field is required" }
        }
        if (registerType.email.trim().length == 0 || registerType.name.trim().length == 0 || registerType.password.trim().length == 0) {
            return { status: false, error: "Values can't be empty" }
        }
        if (isValidEmail != 0) { return { status: false, error: "Mail already exists" } }
        return { status: true }
    }

    static loginValidateType = async (loginType: LoginType, isStaff: Boolean) => {
        if (loginType.email == null) {
            return { status: false, error: "Email field is required" }
        }
        if (loginType.password == null) {
            return { status: false, error: "Password field is required" }
        }
        if (loginType.email.trim().length == 0 || loginType.password.trim().length == 0) {
            return { status: false, error: "Values can't be empty" }
        }
        let user = isStaff ? await Staff.findOne({ email: loginType.email }) : await User.findOne({ email: loginType.email })
        if (user == null) { return isStaff ? { status: false, error: "Staff not found" } : { status: false, error: "Student not found" } }
        const match = await bcrypt.compare(loginType.password, user['password']);
        if (!match) {
            return { status: false, error: "Invalid credentials" }
        }
        return isStaff ? { status: true, staff: user } : { status: true, user: user }
    }

    static oDValidateType = async (createOdType: CreateODType, isUpdate: Boolean) => {
        if (!isUpdate) {

            if (createOdType.from == null) {
                return { status: false, error: "From field is required" }
            }
            if (createOdType.reason == null) {
                return { status: false, error: "Reason field is required" }
            } if (createOdType.staff_id == null) {
                return { status: false, error: "Staff id field is required" }
            }
            if (createOdType.to == null) {
                return { status: false, error: "To field is required" }
            }

            if (createOdType.reason.trim().length == 0) {
                return { status: false, error: "Values can't be empty" }
            }
        }

        if (isUpdate) {
            if (createOdType.od_status == null) {
                return { status: false, error: "OD status is required" }
            }
            if (createOdType.od_status.trim().length == 0) {
                return { status: false, error: "Values can't be empty" }
            }
            let staff = await Staff.findOne({ _id: createOdType.user.user_id })
            let odCount = await Od.find({ _id: createOdType.od_id }).countDocuments()
            let respectedTeacherOdCount = await Od.find({ staff_id: createOdType.user.user_id }).countDocuments();
            if (respectedTeacherOdCount == 0) {
                return { status: false, error: "You can't edit this request" }
            }
            if (odCount == 0) {
                return { status: false, error: "Od request not found" }
            }
            if (staff == null) {
                return { status: false, error: "Only staff can update" }

            }
        }
        return { status: true }

    }
}