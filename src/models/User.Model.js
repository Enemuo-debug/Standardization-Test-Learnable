const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

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

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.PassWord = await bcrypt.hash(this.PassWord, salt)
    next()
})

const UserModel = model('Post-it Users', UserSchema)

module.exports = UserModel