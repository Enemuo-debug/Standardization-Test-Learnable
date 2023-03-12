const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const generateRandomAvatar = require('../middlewares/DiceBearAPI')

const UserSchema = new Schema({
    UserName: {
        type: String,
        required: [true, 'Username is required'],
        // unique: true,
    },
    PassWord: {
        type: String,
        required: [true, 'Password is required'],
    },
    // Avatar: {
    //     type: String,
    //     required: true,
    //     default: generateRandomAvatar(),
    // },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        // unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

// UserSchema.pre('save', async function(next){
//     const salt = await bcrypt.genSalt()
//     this.PassWord = await bcrypt.hash(this.PassWord, salt)
//     next()
// })

const UserModel = model('Post-it Users', UserSchema)

module.exports = UserModel