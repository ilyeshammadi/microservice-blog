const { RESTDataSource } = require('apollo-datasource-rest');

const services = require('../../../common/js/services')

module.exports = class GRPCService extends RESTDataSource {

    constructor(params) {
        super(params);
        this.client = services.getAuthServiceClient();
    }

    async login(loginInput) {
        const result = await new Promise((reslove, reject) => {
            this.client.login(loginInput, (err, res) => {
                if (err) reject(err);
                reslove(res);
            });
        })
        if (!result) {
            throw new ApolloError("user with username or password does not exists")
        }
        return result;
    }

    async getUser(token) {
        const result = await new Promise((reslove, reject) => {
            this.client.getUser({ token }, (err, res) => {
                reslove(res);
            });
        })
        return result;
    }
}