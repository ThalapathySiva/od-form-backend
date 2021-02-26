import *as mongoose from 'mongoose'

const odSchema = new mongoose.Schema({
    reason: {
        required: true,
        type: String
    },
    staff_id: {
        required: true,
        type: String,
    },
    student_id: {
        required: true,
        type: String
    },
    from: {
        required: true,
        type: Date,
    },
    to: {
        required: true,
        type: Date,
    },
    od_status: {
        required: true,
        type: String,
    }
})


const Od = mongoose.model("Od", odSchema)

export { Od }