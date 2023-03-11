const { Schema, model } = require('mongoose')

const PostsSchema = new Schema({
    PostTitle: {
        type: String,
        required: [true, 'A Title for the Post must be entered'],
    },
    Description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    PosterID: {
        type: String,
        required: [true, 'Post ID is required'],
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const PostsModel = model('Post-it Posts', PostsSchema)

module.exports = PostsModel