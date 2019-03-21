const logger = require('../common/js/logger')
const { generateToken, getLoggedinUser, getUserById } = require('./utils')
const { Auth } = require('./models')

async function login({ username, password }) {
    const message = 'wrong username or password';
    if (!username || !password) throw Error('missing username or password');

    try {
        // Query the list of users with username and password
        // it should return one, I hope 😅
        const user = await getLoggedinUser(username, password);
        if (!user) throw Error(message);

        // Retreive the token if the user was found
        if (user) {
            // Get the token otherwise create a new one
            const query = { userId: user.id }
            let auth = await Auth.findOne(query);
            if (!auth) {
                const token = generateToken();
                const data = { token, userId: user.id };
                auth = await Auth.create(data);
            }
            return { token: auth.token };
        }
    } catch (error) {
        logger.error({ message, error, username });
        throw Error(message);
    }

}

async function getUser(request) {
    const message = 'invalid token'
    try {
        // Get the userId that has this token
        const query = { token: request.token };
        const auth = await Auth.findOne(query)
        if (!auth) throw Error(message);
        const user = await getUserById({ id: auth.userId });
        logger.info('authenticated user by token');
        return user;
    } catch (error) {
        logger.error({
            message,
            error
        })
        throw Error(message);
    }
}

module.exports = {
    login,
    getUser,
}

