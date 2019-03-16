const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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

CommentSchema.plugin(mongoosePaginate);

module.exports = {
    Comment: mongoose.model('Comment', CommentSchema)
}