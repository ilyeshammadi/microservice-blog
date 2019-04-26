import { connect, model, Schema } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongodb.dbs.svc.cluster.local';

connect(`${MONGODB_URL}/auth`, { useNewUrlParser: true });

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
