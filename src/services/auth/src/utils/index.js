const services = require('../../common/js/services');

function generateToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 35; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

async function getLoggedinUser(username, password) {
    const usersServiceClient = services.getUsersServiceClient();
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


async function getUserById({ id }) {
    const usersServiceClient = services.getUsersServiceClient();
    return await new Promise((resolve, reject) => {
        usersServiceClient.get({ id }, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

module.exports = {
    generateToken,
    getLoggedinUser,
    getUserById
}