const { logger } = require('../common/js/logger');
const { User } = require('./models')

async function list({ query, paginator }) {
    try {
        const { docs } = await User.paginate(query, paginator);
        logger.info(`fetched ${docs.length} users`);
        return { users: docs };
    } catch (error) {
        const message = 'could not fetch users';
        logger.error({
            message,
            payload: { query, paginator }
        })
        throw Error(message);
    }

}

async function get(id) {
    try {
        const user = await User.findOne({ _id: id });
        logger.info({ message: 'fetched one user', payload: { id } });
        return user;
    } catch (error) {
        const message = 'could not get user';
        logger.error({
            message,
            payload: { id }
        })
        throw Error(message);
    }
}

async function create({ username, password }) {
    const message = 'could not create user';
    try {
        // Check if the user already exists
        if (User.find({ username, password })) throw Error(message);
        const user = new User({ username, password });
        user.save({ username, password });
        logger.info({
            message: `${username} has joined the ship 🕺`,
            payload: { endpoint: 'create' }
        });
        return { user };
    } catch (error) {
        logger.error({
            error,
            message,
            payload: { username }
        })
        throw Error(message);
    }
}

module.exports = {
    list,
    get,
    create,
}

