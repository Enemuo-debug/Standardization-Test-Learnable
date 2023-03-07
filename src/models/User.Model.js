const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    UserName: {
        type: String,
        required: true,
        unique: true,
    },
    PassWord: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const UserModel = model('Post-it Users', UserSchema)

module.exports = UserModel