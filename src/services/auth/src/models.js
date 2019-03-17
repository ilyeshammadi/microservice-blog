const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/auth', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = {
    Auth: mongoose.model('Auth', AuthSchema)
}