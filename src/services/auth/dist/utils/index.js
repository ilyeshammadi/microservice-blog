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
const tools_1 = require("../../common/js/tools");
function generateToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 35; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
exports.generateToken = generateToken;
function getLoggedinUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const usersServiceClient = tools_1.createGrpcClient('users');
        const call = usersServiceClient.list({ query: { username, password } });
        const user = yield new Promise((resolve, reject) => {
            let foundUser;
            call.on('data', user => {
                foundUser = user;
            });
            call.on('end', () => resolve(foundUser));
            call.on('error', err => reject(err));
        });
        return user;
    });
}
exports.getLoggedinUser = getLoggedinUser;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const usersServiceClient = tools_1.createGrpcClient('users');
        return yield new Promise((resolve, reject) => {
            usersServiceClient.get({ id }, (err, res) => {
                if (err)
                    reject(err);
                resolve(res);
            });
        });
    });
}
exports.getUserById = getUserById;
//# sourceMappingURL=index.js.map