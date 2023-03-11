const CommentModel = require('../models/Comments.Model')

class CommentServices {
    async createComment(details, Id, user){
        return await CommentModel.create({
            Comment: details,
            CommentID: Id,
            Commenter: user
        })
    }
    async GetPostsComment (id){
        const Comments = await CommentModel.find()
        const Required = []
        for(let i = 0; i < Comments.length; i++){
            if(Comments[i].CommentID == id){
                Required.push(Comments[i])
            }
        }
        return Required
    }
    async FindByCommenter (id){
        const Comments = await CommentModel.find()
        const Required = []
        for(let i = 0; i < Comments.length; i++){
            if(Comments[i].PosterID == id){
                Required.push(Comments[i])
            }
        }
        return Required
    }
    async UpdateComment(Id, details, user){
        data = {
            Comment: details,
            CommentID: Id,
            Commenter: user
        }
        return await CommentModel.findByIdAndUpdate(Id, data, { new: true })
    }
    async FindByIdAndUpdate(id){
        return await CommentModel.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true })
    }
    async DeleteComment(id){
        return await CommentModel.findByIdAndDelete(id)
    }
    async findById(id){
        return await CommentModel.findById(id)
    }
}

module.exports = new CommentServices()