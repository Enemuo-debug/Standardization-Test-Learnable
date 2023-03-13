const UserModel = require('../models/User.Model')

class UserServices {
    async createUser(name, password, email, avatarUrl){
        return await UserModel.create({
            UserName: name,
            PassWord: password,
            Email: email,
            avatarUrl: avatarUrl,
            imageTag: `<img src="${avatarUrl}" alt="Avatar Url">`
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
    async Update2(id, data){
        return await UserModel.findByIdAndUpdate(id, data, { new: true })
    }
    async FindByIdAndUpdate(id){
        return await UserModel.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true })
    }
}

module.exports = new UserServices()