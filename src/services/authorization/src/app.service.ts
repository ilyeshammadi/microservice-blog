import { Injectable } from '@nestjs/common';
// @ts-ignore
import { logger } from '../common/js/tools';
import { canBySubject, canBySubjectInstance } from './utils/ability';
import { CreateRole } from './interfaces';
import { Role, newAdminRole, newUserRole } from './models';

@Injectable()
export class AppService {
  async can(request) {
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

  async canOnInstance(request) {
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

  async createRole(request: CreateRole) {
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
      const role = await newUserRole(userId);
      logger.info({
        message: "user role created",
        payload: { userId }
      })
      return { role };
    } else if (type === 'admin') {
      const role = await newAdminRole(userId);
      logger.info({
        message: "admin role created",
        payload: { userId }
      })
      return { role };
    }
  }

  async getRoles({ userId }: { userId: string }) {
    try {
      const roles = await Role.find({ userId });
      logger.info({
        message: 'fetched roles',
        payload: { userId }
      })
      return { roles };
    } catch (error) {
      logger.error({
        message: 'can not find roles',
        payload: { userId }
      })
    }
  }
}

