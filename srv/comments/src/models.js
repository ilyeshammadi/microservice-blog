const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/comments', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    articleId: {
        type: String,
        required: true
    },
})

module.exports = {
    Comment: mongoose.model('Comment', CommentSchema)
}