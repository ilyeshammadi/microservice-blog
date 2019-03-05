const mongoose = require('mongoose');
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

module.exports = {
    User: mongoose.model('User', UserSchema)
}