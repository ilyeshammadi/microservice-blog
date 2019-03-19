const { RESTDataSource } = require('apollo-datasource-rest');

const services = require('../../../common/js/services')

module.exports = class GRPCService extends RESTDataSource {
    async list(request) {
        const articlesServiceClient = services.getArticlesServiceClient();
        const call = articlesServiceClient.list(request);
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
        const articlesServiceClient = services.getArticlesServiceClient();
        const result = await new Promise((reslove, reject) => {
            articlesServiceClient.get({ id }, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        })
        return result;
    }

    async create(request) {
        const articlesServiceClient = services.getArticlesServiceClient();
        const result = await new Promise((reslove, reject) => {
            articlesServiceClient.create(request, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        })
        return result;
    }


    async update(request) {
        const articlesServiceClient = services.getArticlesServiceClient();
        const result = await new Promise((reslove, reject) => {
            articlesServiceClient.update(request, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        })
        return result;
    }

    async remove(request) {
        const articlesServiceClient = services.getArticlesServiceClient();
        const result = await new Promise((reslove, reject) => {
            articlesServiceClient.remove(request, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        })
        return result;
    }
}