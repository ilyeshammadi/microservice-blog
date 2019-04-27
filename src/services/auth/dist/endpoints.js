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
const grpc_1 = require("grpc");
const handlers = require("./handlers");
function login(call, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            callback(null, yield handlers.login(call.request));
        }
        catch (error) {
            callback({
                status: grpc_1.status.NOT_FOUND,
                message: "user with this username and password does not exists",
            }, null);
        }
    });
}
exports.login = login;
function getUser(call, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            callback(null, yield handlers.getUser(call.request));
        }
        catch (error) {
            callback({
                code: grpc_1.status.NOT_FOUND,
                message: "invalid token",
            }, null);
        }
    });
}
exports.getUser = getUser;
//# sourceMappingURL=endpoints.js.map