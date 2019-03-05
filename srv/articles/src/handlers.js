const { Article } = require('./models')

async function list(filters) {
    return await new Promise((resolve, reject) => {
        Article.find(filters, (err, articles) => {
            if (err) reject(err)
            resolve({ articles })
        })
    })
}

async function get({ id }) {
    return await new Promise((resolve, reject) => {
        Article.findOne({ _id: id }, (err, article) => {
            if (err) reject(err);
            resolve(article)
        })
    })
}


async function create(article) {
    const articleModel = new Article(article);
    return await new Promise((resolve, reject) => {
        articleModel.save((err, articleCreated) => {
            if (err) reject(err)
            resolve(articleCreated)
        })
    })
}

module.exports = {
    list,
    get,
    create,

}

