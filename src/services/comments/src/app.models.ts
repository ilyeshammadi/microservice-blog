import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const MONGODB_URL = process.env.MONGODB_URL;

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

export const Comment = mongoose.model('Comment', CommentSchema);
