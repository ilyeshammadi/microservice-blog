import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { get } from 'lodash';
import { HasAccessToArgs } from '../interfaces/has-access-to.interface';
import { AuthorizationGrpcService } from 'src/authorization/authorization.grpc';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    authorizationGrpcClient;

    constructor(private readonly reflector: Reflector) {
        this.authorizationGrpcClient = new AuthorizationGrpcService();
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { user } = ctx.getContext();
        if (!user) throw new Error('can not get user from context, missing AuthGuard')
        const ability = this.reflector.get<HasAccessToArgs>('ability', context.getHandler());

        if (ability.instance) {
            const args = ctx.getArgs();
            const instanceId = get(args, 'id') || get(args, 'input.id')
            if (!instanceId) throw new Error('parsing error, could not get instance id');

            const request = {
                userId: user.id,
                action: ability.action,
                subject: ability.subject,
                subjectId: instanceId
            }
            const { yes } = await this.authorizationGrpcClient.canOnInstance(request)
            return yes;
        } else {
            const request = {
                userId: user.id,
                action: ability.action,
                subject: ability.subject,
            }
            const { yes } = await this.authorizationGrpcClient.can(request)
            return yes;
        }
    }
}