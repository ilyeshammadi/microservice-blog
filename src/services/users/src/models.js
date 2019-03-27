const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

mongoose.connect('mongodb://mongo/users', { useNewUrlParser: true });

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