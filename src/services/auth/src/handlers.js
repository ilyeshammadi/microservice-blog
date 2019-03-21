const logger = require('../common/js/logger')
const { generateToken, getLoggedinUser, getUserById } = require('./utils')
const { Auth } = require('./models')

async function login({ username, password }) {
    if (!username || !password) throw Error('missing username or password');

    try {
        // Query the list of users with username and password
        // it should return one, I hope 😅
        const user = await getLoggedinUser(username, password);
        if (!user) throw Error();

        if (user) {
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
        logger.error({ error, username });
        throw Error('wrong username or password');
    }

}

async function getUser(request) {
    // Get the userId that has this token
    const query = { token: request.token };
    const auth = await Auth.findOne(query)
    if (!auth) return null;
    return await getUserById({ id: auth.id });
}

module.exports = {
    login,
    getUser,
}

