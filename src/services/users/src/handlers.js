const { logger, grpcClients } = require('../common/js/tools');
const { User } = require('./models')

const authorization = grpcClients.authorization;

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
        const found = await User.find({ username });
        if (found.length !== 0) throw Error(message);
        // Create a new user
        const user = new User({ username, password });
        user.save({ username, password });
        logger.info({
            message: `${username} has joined the ship 🕺`,
            payload: { endpoint: 'create' }
        });

        // Create the user role, if error delete the user
        try {
            const createRoleRequest = { userId: user.id, type: 'user' };
            await new Promise((resolve, reject) => {
                authorization.createRole(createRoleRequest, (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                })
            });
        } catch (error) {
            // If error, delete the created user
            await User.deleteOne({ id: user.id });
            throw new Error('could not create role');
        }

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

