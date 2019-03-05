const { User } = require('./models')

async function list(filters) {
    return await new Promise((resolve, reject) => {
        User.find(filters, (err, users) => {
            if (err) reject(err);
            resolve({ users })
        })
    })
}

async function get(id) {
    return await new Promise((resolve, reject) => {
        User.findOne({ _id: id }, (err, user) => {
            if (err) reject(err);
            resolve(user)
        })
    })
}

async function create(username, password) {
    return await new Promise((resolve, reject) => {
        const user = new User({ username, password });
        user.save({ username, password }, (err, user) => {
            if (err) reject(err);
            resolve(user)
        })
    })
}

module.exports = {
    list,
    get,
    create,
}

