import { connect, model, Schema } from 'mongoose';

connect('mongodb://mongo/auth', { useNewUrlParser: true });

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

export const Auth = model('Auth', AuthSchema);
