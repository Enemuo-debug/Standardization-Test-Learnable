const { Schema, model } = require('mongoose')

const CommentsSchema = new Schema({
    Comment: {
        type: String,
        required: true,
    },
    CommentID: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const CommentModel = model('Post-it Comments', CommentsSchema)

module.exports = CommentModel