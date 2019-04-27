"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongodb.dbs.svc.cluster.local';
mongoose_1.connect(`${MONGODB_URL}/auth`, { useNewUrlParser: true });
const AuthSchema = new mongoose_1.Schema({
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
});
exports.Auth = mongoose_1.model('Auth', AuthSchema);
//# sourceMappingURL=models.js.map