const { first } = require('lodash');
const utils = require('./utils.js')
const { Auth } = require('./models')

async function login(request) {
    if (!request.username || !request.password) return null;

    const usersServiceClient = utils.getUsersServiceClient();
    const call = usersServiceClient.list(request)
    const user = await new Promise((resolve, reject) => {
        call.on('data', user => {
            resolve(user)
        })
        call.on('error', err => reject(err));
    })
    if (user) {
        const token = await new Promise(async (resolve, reject) => {
            const query = { userId: user.id }
            let auth = await Auth.findOne(query);
            if (!auth) {
                const token = utils.generateToken();
                const data = { token, userId: user.id };
                auth = await Auth.create(data);
            }
            resolve(auth.token);
        })

        return {
            token
        };
    }
    return null;
}

async function getUser(request) {
    const usersServiceClient = utils.getUsersServiceClient();
    // Get the userId that has this token
    const query = { token: request.token };
    const auth = await Auth.findOne(query)
    if (!auth) return null;


    // Get the user
    return await new Promise((resolve, reject) => {
        usersServiceClient.get({ id: auth.userId }, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

module.exports = {
    login,
    getUser,
}
