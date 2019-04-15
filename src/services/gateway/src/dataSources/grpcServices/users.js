const { ApolloError } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest');
const { createGrpcClient } = require('../../../common/js/tools');

module.exports = class GRPCService extends RESTDataSource {

    constructor(params) {
        super(params);
        this.client = createGrpcClient('users');
    }

    async list(request) {
        const call = this.client.list(request)
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

    async create({ username, password }) {
        const createRequest = { username, password };
        const result = await new Promise((resolve, reject) => {
            this.client.create(createRequest, (err, res) => {
                if (err) reject(err);
                if (res) resolve(res.user);
            })
        })
        return result;
    }

    async get({ id }) {
        const getRequest = { id };
        const result = await new Promise((resolve, reject) => {
            this.client.get(getRequest, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        })
        if (!result) {
            throw new ApolloError("user with id does not exists")
        }
        return result;
    }

}