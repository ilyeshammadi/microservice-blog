const { ApolloError } = require('apollo-server')
const services = require('../utils/services')

async function list(request) {
    console.log(request)
    const usersServiceClient = services.getUsersServiceClient();
    const call = usersServiceClient.list(request)
    return await new Promise((resolve, reject) => {
        const users = [];
        call.on('data', user => {
            users.push(user);
        })
        call.on('end', () => {
            resolve(users)
        })
        call.on('error', err => reject(err));
    })
}

async function create({ username, password }) {
    const usersServiceClient = services.getUsersServiceClient();
    const createRequest = { username, password };
    const result = await new Promise((resolve, reject) => {
        usersServiceClient.create(createRequest, (err, res) => {
            if (err) reject(err);
            if (res) resolve(res.user);
        })
    })
    return result;
}

async function get({ id }) {
    const usersServiceClient = services.getUsersServiceClient();
    const getRequest = { id };
    const result = await new Promise((resolve, reject) => {
        usersServiceClient.get(getRequest, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
    if (!result) {
        throw new ApolloError("user with id does not exists")
    }
    return result;
}


module.exports = {
    list,
    create,
    get,
}