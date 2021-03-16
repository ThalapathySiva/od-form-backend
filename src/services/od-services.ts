import { Admin } from "../models/admin-model";
import { Od } from "../models/od-model";
import { Staff } from "../models/staff-model";
import { ValidateHelper } from "../utils/validate-helper";

export class ODService {
    createOD = async (requestData: CreateODType) => {
        try {
            let createODValidateResponse = await ValidateHelper.oDValidateType(requestData, false, false)
            if (!createODValidateResponse['status']) {
                return createODValidateResponse;
            }
            let reqOd = new Od({
                reason: requestData.reason,
                from: new Date(requestData.from),
                to: new Date(requestData.to),
                staff_id: requestData.staff_id,
                student_id: requestData.user.user_id,
                register_number: requestData.register_number,
                od_status: 'pending',
                is_granted: false,
            })
            let od = await reqOd.save()
            return { status: true, error: "OD registered Successfully" }
        }
        catch (e) {
            console.log(e)
        }
    }


    updateOD = async (requestData: CreateODType) => {
        try {
            let isAdmin = await Admin.findOne({ _id: requestData.user.user_id })
            let odUpdateValidateResponse = await ValidateHelper.oDValidateType(requestData, true, isAdmin != null)
            if (!odUpdateValidateResponse['status']) {
                return odUpdateValidateResponse;
            }

            let updateOd = await Od.findByIdAndUpdate({
                _id: requestData.od_id
            }, {
                od_status: requestData.od_status,
                is_granted: isAdmin != null ? requestData.od_status == 'accepted' ? true : false : false
            })
            return { status: true, error: "OD updated Successfully" }
        }
        catch (e) {
            console.log(e)
        }
    }

    getOD = async (getODType: CreateODType) => {
        try {
            let staffData = await Staff.findOne({ _id: getODType.user.user_id })
            if (staffData != null) {
                let getOd = await Od.find(
                    {
                        staff_id: getODType.user.user_id
                    }
                )
                return { status: true, data: getOd }
            }

            let getOd = await Od.find(
                {
                    student_id: getODType.user.user_id
                }
            )
            return { status: true, data: getOd }
        }
        catch (e) {
            console.log(e)
        }
    }

    odDetail = async (id: string) => {
        try {
            let getOd = await Od.findOne(
                {
                    _id: id
                }
            )
            return { status: true, data: getOd }
        }
        catch (e) {
            console.log(e)
        }
    }

}

export type CreateODType = {
    reason: string,
    staff_id: string,
    from: string,
    to: string,
    od_status: string,
    od_id: string,
    user: any,
    register_number: string,
}