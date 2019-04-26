const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongodb.dbs.svc.cluster.local';

mongoose.connect(`${MONGODB_URL}/comments`, { useNewUrlParser: true });

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