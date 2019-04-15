const { RESTDataSource } = require('apollo-datasource-rest');
const { createGrpcClient } = require('../../../common/js/tools');

module.exports = class GRPCService extends RESTDataSource {

    constructor(params) {
        super(params);
        this.client = createGrpcClient('articles');
    }

    async list(request) {
        const call = this.client.list(request);
        const articles = await new Promise((resolve, reject) => {
            const articles = []
            call.on('data', article => {
                articles.push(article);
            })
            call.on('end', () => {
                resolve(articles);
            });
            call.on('error', err => reject(err));
        })
        return articles;
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


    async update(request) {
        const result = await new Promise((reslove, reject) => {
            this.client.update(request, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        })
        return result;
    }

    async remove(request) {
        const result = await new Promise((reslove, reject) => {
            this.client.remove(request, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        })
        return result;
    }
}