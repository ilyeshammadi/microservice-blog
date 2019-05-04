import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(`${MONGODB_URL}/users`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true
    },
})

UserSchema.plugin(mongoosePaginate);


export const User = mongoose.model('User', UserSchema);
