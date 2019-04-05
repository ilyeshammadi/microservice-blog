import { status } from 'grpc';
import * as handlers from './handlers';

export async function login(call, callback: Function) {
    try {
        callback(null, await handlers.login(call.request));
    } catch (error) {
        callback({
            status: status.NOT_FOUND,
            message: "user with this username and password does not exists",
        }, null)
    }

}

export async function getUser(call, callback: Function) {
    try {
        callback(null, await handlers.getUser(call.request));
    } catch (error) {
        callback({
            code: status.NOT_FOUND,
            message: "invalid token",
        }, null);
    }
}