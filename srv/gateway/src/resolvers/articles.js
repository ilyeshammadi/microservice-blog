const services = require('../utils/services')

async function list(request) {
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