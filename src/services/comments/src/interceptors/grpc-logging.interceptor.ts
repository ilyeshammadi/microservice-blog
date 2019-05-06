import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from '../../common/js/tools';

@Injectable()
export class GrpcLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = context.getHandler().name;

        logger.info({ handler, status: 'start' })

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap((x) => logger.info({
                    message: { handler, status: 'finish' },
                    executionTime: `${Date.now() - now}ms`
                })),
            );
    }
}