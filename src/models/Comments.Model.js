const { Schema, model } = require('mongoose')

const CommentsSchema = new Schema({
    Comment: {
        type: String,
        required: [true, "A comment is required"],
    },
    // The parameter below is what will contain the id of the post being published
    CommentID: {
        type: String,
        required: [true, 'The ID of the Post being edited is of utmost importance'],
    },
    Commenter: {
        type: String,
        required: [true, 'The ID of the User creating this post is important and very much required'],
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const CommentModel = model('Post-it Comments', CommentsSchema)

module.exports = CommentModel