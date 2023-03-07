const CommentModel = require('../models/Comments.Model')

class CommentServices {
    async createComment(details, Id, user){
        return await CommentModel.create({
            Comment: details,
            CommentID: Id,
            Commenter: user
        })
    }
    async GetPostsComment(id){
        return await CommentModel.findOne({ CommentID: id })
    }
    async UpdateComment(Id, details, Id, user){
        data = {
            Comment: details,
            CommentID: Id,
            Commenter: user
        }
        return await CommentModel.findByIdAndUpdate(Id, data, { new: true })
    }
    async DeleteComment(id){
        return await CommentModel.findByIdAndDelete(id)
    }
}

module.exports = new CommentServices()