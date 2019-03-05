const services = require('../utils/services')

async function list(filters = {}) {
    const commentsServiceClient = services.getCommentsServiceClient();
    const result = await new Promise((reslove, reject) => {
        commentsServiceClient.list(filters, (err, res) => {
            if (err) reject(err)
            reslove(res);
        });
    })
    return result.comments ? result.comments : [];
}

async function get({ id }) {
    const commentsServiceClient = services.getCommentsServiceClient();
    const result = await new Promise((reslove, reject) => {
        commentsServiceClient.get({ id }, (err, res) => {
            if (err) reject(err)
            reslove(res);
        });
    })
    return result;
}

async function create(request) {
    const commentsServiceClient = services.getCommentsServiceClient();
    const result = await new Promise((reslove, reject) => {
        commentsServiceClient.create(request, (err, res) => {
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