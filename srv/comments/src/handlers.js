const { Comment } = require('./models')

async function list(filters) {
    return await new Promise((resolve, reject) => {
        Comment.find(filters, (err, comments) => {
            if (err) reject(err)
            resolve({ comments })
        })
    })
}

async function get({ id }) {
    return await new Promise((resolve, reject) => {
        Comment.findOne({ _id: id }, (err, comment) => {
            if (err) reject(err);
            resolve(comment)
        })
    })
}

async function create(comment) {
    const commentModel = new Comment(comment);
    return await new Promise((resolve, reject) => {
        commentModel.save((err, commentCreated) => {
            if (err) reject(err)
            resolve(commentCreated)
        })
    })
}

module.exports = {
    list,
    get,
    create,

}

