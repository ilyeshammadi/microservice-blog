const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const constants = require('./utils/constants')

mongoose.connect('mongodb://mongo/authorization', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const subjectsEnum = Object.values(constants.SUBJECTS);
const actionsEnum = Object.values(constants.ACTIONS);
const roleTypeNameEnum = Object.values(constants.ROLE_TYPES).map(roleType => roleType.name);

const SubjectSchema = new Schema({
    name: { type: String, required: true },
    conditionFieldName: { type: String }
})

const PermissionSchema = new Schema({
    subject: { type: SubjectSchema, required: true, enum: subjectsEnum },
    actions: [{ type: String, required: true, enum: actionsEnum }]
})

const RoleSchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true, enum: roleTypeNameEnum },
    permissions: [PermissionSchema]
})

RoleSchema.plugin(mongoosePaginate);

const Role = mongoose.model('Role', RoleSchema)

Role.newUserRole = async userId => {
    return await new Role({
        userId,
        type: constants.ROLE_TYPES.user.name,
        permissions: constants.ROLE_TYPES.user.permissions
    }).save()
}

Role.newAdminRole = async userId => {
    return await new Role({
        userId,
        type: constants.ROLE_TYPES.admin.name,
        permissions: constants.ROLE_TYPES.admin.permissions
    }).save()
}

module.exports = {
    Role,
}