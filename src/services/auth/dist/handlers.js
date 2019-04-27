"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../common/js/tools");
const index_1 = require("./utils/index");
const models_1 = require("./models");
function login(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = params;
        const message = 'wrong username or password';
        if (!username || !password)
            throw Error('missing username or password');
        try {
            const user = yield index_1.getLoggedinUser(username, password);
            if (!user)
                throw Error(message);
            if (user) {
                const query = { userId: user.id };
                let auth = yield models_1.Auth.findOne(query);
                if (!auth) {
                    const token = index_1.generateToken();
                    const data = { token, userId: user.id };
                    auth = yield models_1.Auth.create(data);
                }
                return { token: auth.token };
            }
        }
        catch (error) {
            tools_1.logger.error({ message, error, username });
            throw Error(message);
        }
    });
}
exports.login = login;
function getUser(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = params;
        const message = 'invalid token';
        try {
            const auth = yield models_1.Auth.findOne({ token });
            if (!auth)
                throw Error(message);
            const user = yield index_1.getUserById(auth.userId);
            tools_1.logger.info('authenticated user by token');
            return user;
        }
        catch (error) {
            tools_1.logger.error({
                message,
                error
            });
            throw Error(message);
        }
    });
}
exports.getUser = getUser;
//# sourceMappingURL=handlers.js.map