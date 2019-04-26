const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongodb.dbs.svc.cluster.local';

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

module.exports = {
    User: mongoose.model('User', UserSchema)
}