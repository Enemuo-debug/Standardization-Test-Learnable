const { Schema, model } = require('mongoose')

const PostsSchema = new Schema({
    PostTitle: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    PosterID: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const PostsModel = model('Post-it Posts', PostsSchema)

module.exports = PostsModel