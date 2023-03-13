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
    
    Email: {
        type: String,
        required: [true, 'Email is required'],
        // unique: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    imageTag: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

// UserSchema.virtual('avatarUrl').get(async function() {
//     // const altText = `Avatar for ${this.UserName}`;
//     this.avatarUrl2 = await generateRandomAvatar(this.email)
//     return await generateRandomAvatar(this.email)
// });

// UserSchema.virtual('imageTag').get(function() {
//     const altText = `Avatar for ${this.UserName}`;
//     this.imageTag2 = `<img src="${this.avatarUrl}" alt="${altText}">`
//     return `<img src="${this.avatarUrl}" alt="${altText}">`;
// });

// UserSchema.pre('save', async function (next){
//     const altText = `Avatar for ${this.UserName}`;
//     this.imageTag = `<img src="${this.avatarUrl}" alt="${altText}">`
// })


const UserModel = model('Post-it Users', UserSchema)

module.exports = UserModel