const { ForbiddenError } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');
const { createGrpcClient } = require('../../../common/js/tools');

module.exports = class GRPCService extends RESTDataSource {

    constructor(params) {
        super(params);
        this.client = createGrpcClient('authorization');
    }

    async can(request) {
        const res = await new Promise((resolve, reject) => {
            this.client.can(request, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
        if (!res.yes) throw new ForbiddenError('permission error')
    }

    async canOnInstance(request) {
        const res = await new Promise((resolve, reject) => {
            this.client.canOnInstance(request, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
        if (!res.yes) throw new ForbiddenError('permission error')
    }

    async getRoles(request) {
        return await new Promise((resolve, reject) => {
            this.client.getRoles(request, (err, res) => {
                if (err) reject(err);
                resolve(res.roles);
            });
        });
    }

}