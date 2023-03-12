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
        const Posts = await PostsModel.find()
        const Required = []
        for(let i = 0; i < Posts.length; i++){
            if(Posts[i].PosterID == id){
                Required.push(Posts[i])
            }
        }
        return Required
    }

    async findByID(id){
        return await PostsModel.findById({ _id: id, isActive: true })
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
    async FindByIdAndUpdate(id){
        return await PostsModel.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true })
    }
    async Update2(id, data){
        return await PostsModel.findByIdAndUpdate(id, data, { new: true })
    }
}

module.exports = new PostsServices()