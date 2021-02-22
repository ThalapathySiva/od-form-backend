import *as mongoose from 'mongoose'

const staffSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    }, email: {
        required: true,
        type: String,
    }, password: {
        required: true,
        type: String,
    },

})

const Staff = mongoose.model("Staff", staffSchema)

export { Staff }