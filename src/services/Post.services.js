const PostsModel = require('../models/Post-It-Model')

class PostsServices{
    // Create a Post-it
    async CreatePosts(title, description, posterid){
        return await PostsModel.create({
            PostTitle: title,
            Description: description,
            PosterID: posterid
        })
    }

    // Fetch All Posts
    async FindAllPosts(){
        return await PostsModel.find()
    }

    // Fetch Post-it by Posters-ID
    async FindByPostID (id){
        return await PostsModel.findOne(id)
    }

    async FindById(id){
        return await PostsModel.findById(id)
    }

    async UpdatePost(id, title, description, posterid){
        const data = {
            PostTitle: title,
            Description: description,
            PosterID: posterid
        }
        return await PostsModel.findByIdAndUpdate(id, data, { new: true })
    }
    async DeletePost(id){
        return await PostsModel.findByIdAndDelete(id)
    }
}

module.exports = new PostsServices()