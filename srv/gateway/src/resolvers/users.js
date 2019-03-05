const { ApolloError } = require('apollo-server')
const services = require('../utils/services')

async function list(filters = {}) {
    const usersServiceClient = services.getUsersServiceClient();
    const result = await new Promise((reslove, reject) => {
        usersServiceClient.list(filters, (err, res) => {
            if (err) reject(err)
            reslove(res);
        });
    })
    return result.users;
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