import {
    createGrpcClient
    // @ts-ignore
} from '../../common/js/tools';

export function generateToken(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 35; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export async function getLoggedinUser(username: string, password: string) {
    const usersServiceClient = createGrpcClient('users');
    const call = usersServiceClient.list({ query: { username, password } })
    const user = await new Promise((resolve, reject) => {
        let foundUser;
        call.on('data', user => {
            foundUser = user;
        })
        call.on('end', () => resolve(foundUser));
        call.on('error', err => reject(err));
    })
    return user;
}


export async function getUserById(id: string) {
    const usersServiceClient = createGrpcClient('users');
    return await new Promise((resolve, reject) => {
        usersServiceClient.get({ id }, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}
