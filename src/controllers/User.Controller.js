const UserServices = require('../services/User.Services')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config()
const maxAge1 = 3*24*60*60*1000

class UserControllers {
    async SignUp(req, res){
        const { name, email, password } = req.body
        if(!name){
            return res.json({ 
                message: 'Please enter a name', 
                success: false
            })
        }
        else if(!email){
            return res.json({ 
                message: 'Please enter an email', 
                success: false
            })
        }
        else if(!password){
            return res.json({ 
                message: 'Please enter a password', 
                success: false
            })
        }
        else{
            const existingUser = await UserServices.findByName(name)
            if (existingUser){
                return res.json({
                    message: 'User already exists on DataBase',
                    success: false
                })
            }
            else{
                const User = await UserServices.createUser(name, password, email)
                return res.json({
                    message: 'User created successfully',
                    success: true,
                    user: User
                })
            }
        }
    }
    async SignIn(req, res){
        const { name, email, password } = req.body
        if(!name){
            return res.json({ 
                message: 'Please enter a name', 
                success: false
            })
        }
        else if(!email){
            return res.json({ 
                message: 'Please enter an email', 
                success: false
            })
        }
        else if(!password){
            return res.json({ 
                message: 'Please enter a password', 
                success: false
            })
        }
        else{
            const existingUser = await UserServices.findByName(name)
            if (existingUser){
                if(existingUser.Email === email){
                    const auth = await bcrypt.compare(password, existingUser.PassWord)
                    if (auth) {
                        const token = await JWT.sign(existingUser._id, process.env.SECRET, { maxAge: maxAge1/1000 })
                        res.cookie('jwt', token, { maxAge: maxAge1 })
                        return res.json({
                            message: "User Logged In Successfully",
                            success: true,
                            data: `${existingUser.UserName} has Signed in to his/her account`
                        })
                    }
                    else{
                        return res.json({
                            message: 'The Password you entered does not correspond to that which exists as the password to the user you are trying to log in to in the DataBase',
                            success: false
                        })
                    }
                }
            }
        }
    }
}

module.exports = new UserControllers()