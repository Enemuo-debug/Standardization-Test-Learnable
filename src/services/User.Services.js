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
        return await UserModel.findOne({ isActive: true })
    }
    async findByName(name){
        return await UserModel.findOne({ UserName: name, isActive: true })
    }
    async findByID(id){
        return await UserModel.findById({ _id: id, isActive: true })
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
    async FindByIdAndUpdate(id){
        return await UserModel.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true })
    }
}

module.exports = new UserServices()