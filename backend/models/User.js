const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phonenumber: {
            type: String,
            required: true 
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "author", "admin"]
        },
        username: {
            type: String,
            required: true 
        },
        city: {
            type: String,
            required: true 
        },
        password: {
            type: String,
            required: true 
        }
    },
    { timestamps: true }

)

module.exports = model('user', UserSchema)