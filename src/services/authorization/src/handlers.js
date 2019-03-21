const logger = require('../common/js/logger');
const { canBySubject, canBySubjectInstance } = require('./utils/ability')
const { Role } = require('./models')

async function can(request) {
    try {
        const { userId } = request;
        // Get all roles related with the user
        const roles = await Role.find({ userId })
        return { yes: canBySubject({ roles, ...request }) };
    } catch (error) {
        logger.error({
            message: "permission error",
            payload: request,
            error
        })
        return { yes: false };
    }
}

async function canOnInstance(request) {
    try {
        const { userId } = request;
        // Get all roles related with the user
        const roles = await Role.find({ userId })
        return { yes: await canBySubjectInstance({ roles, ...request }) };
    } catch (error) {
        logger.error({
            message: "permission error",
            payload: request,
            error
        })
        return { yes: false };
    }
}

async function createRole(request) {
    const { userId, type } = request;
    // Check if there is an existing role with the combination of userId and type
    const existingRole = await Role.findOne({ userId, type });
    if (existingRole) {
        const message = 'role already created';
        logger.error({
            message,
            payload: request
        })
        throw Error(message)
    }
    if (type === 'user') {
        const role = await Role.newUserRole(userId);
        return { role };
    } else if (type === 'admin') {
        const role = await Role.newAdminRole(userId);
        return { role };
    }
}


module.exports = {
    can,
    canOnInstance,
    createRole
}

