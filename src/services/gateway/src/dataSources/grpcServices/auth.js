const { RESTDataSource } = require('apollo-datasource-rest');

const services = require('../../../common/js/services')

module.exports = class GRPCService extends RESTDataSource {
    async login(loginInput) {
        const authServiceClient = services.getAuthServiceClient();
        const result = await new Promise((reslove, reject) => {
            authServiceClient.login(loginInput, (err, res) => {
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
        const authServiceClient = services.getAuthServiceClient();
        const result = await new Promise((reslove, reject) => {
            authServiceClient.getUser({ token }, (err, res) => {
                reslove(res);
            });
        })
        return result;
    }
}