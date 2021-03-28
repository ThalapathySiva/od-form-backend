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
    register_number: {
        require: true,
        type: String
    },
    to: {
        required: true,
        type: Date,
    },
    od_status: {
        required: true,
        type: String,
    },
    is_granted: {
        required: true,
        type: Boolean
    },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    file_url: { type: String },
    file_mime_type: { type: String }
})


const Od = mongoose.model("Od", odSchema)

export { Od }