import *as mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }, email: {
        required: true,
        type: String
    }, password: {
        required: true,
        type: String
    },
    user_type: {
        required: true,
        type: String
    }
})


const Admin = mongoose.model("Admin", adminSchema)

export { Admin }