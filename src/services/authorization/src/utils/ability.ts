import { Ability } from '@casl/ability';
import { get } from 'lodash';

import {
    createGrpcClient
    // @ts-ignore
} from '../../common/js/tools';
// @ts-ignore
import { logger } from '../../common/js/tools';
import * as constants from './constants';

function reducePermissionsFromRoles(roles) {
    const permissions = [];
    roles.map(role => {
        role.permissions.map(permission => {
            const reducedPermission = {
                subject: get(permission, 'subject.name'),
                actions: get(permission, 'actions'),
                conditions: {}
            }
            // Add the condition if it exists
            const conditionFieldName = get(permission, 'subject.conditionFieldName')
            if (conditionFieldName) {
                reducedPermission.conditions[conditionFieldName] = role.userId;
            }

            permissions.push(reducedPermission);
        });
    });
    return permissions;
}

const TYPE_FIELD = Symbol('subject')

function subjectName(subject) {
    return !subject || typeof subject === 'string' ? subject : subject[TYPE_FIELD]
}
function subjectt(name, object) {
    return { [TYPE_FIELD]: name, ...object }
}

async function getSubjectInstance(subject, id) {
    let subjectInstance;
    if (subject === constants.SUBJECTS.article.name) {
        const client = createGrpcClient('articles');
        subjectInstance = await new Promise((reslove, reject) => {
            client.get({ id }, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        });
    } else if (subject === constants.SUBJECTS.comment.name) {
        const client = createGrpcClient('comments');
        subjectInstance = await new Promise((reslove, reject) => {
            client.get({ id }, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        });
    } else if (subject === constants.SUBJECTS.user.name) {
        const client = createGrpcClient('users');
        subjectInstance = await new Promise((reslove, reject) => {
            client.get({ id }, (err, res) => {
                if (err) reject(err)
                reslove(res);
            });
        });
    }
    return subjectInstance;
}

export function canBySubject(params) {
    const { roles, userId, action, subject } = params;
    const permissions = reducePermissionsFromRoles(roles);
    const ability = new Ability(permissions, { subjectName })
    const hasAbility = ability.can(action, subject);
    if (!hasAbility) {
        logger.warn({
            message: 'wrong permissions',
            payload: { userId, action, subject }
        })
    }
    return hasAbility;
}

export async function canBySubjectInstance(params) {
    const { roles, userId, action, subject, subjectId } = params;
    const permissions = reducePermissionsFromRoles(roles);
    const ability = new Ability(permissions, { subjectName })
    try {
        const subjectInstance = await getSubjectInstance(subject, subjectId);
        const hasAbility = ability.can(action, subjectt(subject, subjectInstance));
        if (!hasAbility) {
            logger.warn({
                message: 'wrong permissions',
                payload: { userId, action, subject, subjectId }
            })
        }
        return hasAbility;
    } catch (error) {
        logger.error({
            error,
            message: 'can not find subject',
            payload: { userId, action, subject, subjectId }
        })
    }
}