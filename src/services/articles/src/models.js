const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongodb.dbs.svc.cluster.local';

mongoose.connect(`${MONGODB_URL}/articles`, { useNewUrlParser: true });

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

ArticleSchema.plugin(mongoosePaginate);

module.exports = {
    Article: mongoose.model('Article', ArticleSchema)
}