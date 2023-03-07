const UserModel = require('../models/User.Model')

class UserServices {
    async createUser(name, password, email){
        return await UserModel.create({
            UserName: name,
            PassWord: password,
            Email: email
        })
    }
    async findUsers(){
        return await UserModel.find()
    }
    async findByID(id){
        return await UserModel.findById(id)
    }
    async updateUser(id, name, password, email){
        const data = {
            UserName: name,
            PassWord: password,
            Email: email
        }
        return await UserModel.findByIdAndUpdate(id, data, { new: true })
    }
    async deleteUser(id){
        return await UserModel.findByIdAndDelete(id)
    }
}

module.exports = new UserServices()