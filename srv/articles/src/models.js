const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/articles', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    }
})

module.exports = {
    Article: mongoose.model('Article', ArticleSchema)
}