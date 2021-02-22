import *as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }, email: {
        required: true,
        type: String
    }, password: {
        required: true,
        type: String
    }
})

const User = mongoose.model("User", userSchema)
export { User }