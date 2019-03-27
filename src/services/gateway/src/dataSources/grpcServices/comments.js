const { RESTDataSource } = require('apollo-datasource-rest');

const services = require('../../../common/js/services')

module.exports = class GRPCService extends RESTDataSource {

    constructor(params) {
        super(params);
        this.client = services.getCommentsServiceClient();
    }

    async list(request) {
        const call = this.client.list(request);
        const comments = await new Promise((resolve, reject) => {
            const comments = []
            call.on('data', comment => {
                comments.push(comment);
            })
            call.on('end', () => {
                resolve(comments);
            });
            call.on('error', err => reject(err));
        })
        return comments ? comments : [];

    }

    async get({ id }) {
        const result = await new Promise((reslove, reject) => {
            this.client.get({ id }, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        })
        return result;
    }

    async create(request) {
        const result = await new Promise((reslove, reject) => {
            this.client.create(request, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        })
        return result;
    }
}