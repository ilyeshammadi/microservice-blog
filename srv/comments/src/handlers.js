const { Comment } = require('./models')

async function list({ query, paginator }) {
    return await new Promise((resolve, reject) => {
        Comment.paginate(query, paginator, (err, result) => {
            if (err) reject(err)
            resolve({ comments: result.docs })
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

