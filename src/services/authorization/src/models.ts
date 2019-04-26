import { Schema, connect, model } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

import * as constants from './utils/constants';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongodb.dbs.svc.cluster.local';

connect(`${MONGODB_URL}/authorization`, { useNewUrlParser: true });

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

export const Role = model('Role', RoleSchema)

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

