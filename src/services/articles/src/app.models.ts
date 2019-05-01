import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(`${MONGODB_URL}/articles`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

ArticleSchema.plugin(mongoosePaginate);

export const Article = mongoose.model('Article', ArticleSchema);
