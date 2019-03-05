const services = require('../utils/services')

async function list(filters = {}) {
    const articlesServiceClient = services.getArticlesServiceClient();
    const result = await new Promise((reslove, reject) => {
        articlesServiceClient.list(filters, (err, res) => {
            if (err) reject(err)
            reslove(res);
        });
    })
    return result.articles;
}

async function get({ id }) {
    const articlesServiceClient = services.getArticlesServiceClient();
    const result = await new Promise((reslove, reject) => {
        articlesServiceClient.get({ id }, (err, res) => {
            if (err) reject(err)
            reslove(res);
        });
    })
    return result;
}

async function create(request) {
    const articlesServiceClient = services.getArticlesServiceClient();
    const result = await new Promise((reslove, reject) => {
        articlesServiceClient.create(request, (err, res) => {
            if (err) reject(err)
            reslove(res);
        });
    })
    return result;
}

module.exports = {
    list,
    get,
    create,
}