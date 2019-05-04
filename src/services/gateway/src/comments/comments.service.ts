import { Injectable } from '@nestjs/common';
import { Comment } from './types/comment.type';
import { commentsGrpcClientOptions } from 'src/common/options/comments-grpc.option';
import { ClientGrpc, Client, GrpcService } from '@nestjs/microservices';
import { map, reduce } from 'rxjs/operators';

@Injectable()
export class CommentsService {
    @Client(commentsGrpcClientOptions)
    client: ClientGrpc

    grpcService;

    onModuleInit() {
        this.grpcService = this.client.getService('GrpcService');
    }
    async list(query, paginate) {
        return this.grpcService.list({ query, paginate })
            .pipe(reduce((acc, curr) => [curr, ...acc], []))
    }

    async get(id: string) {
        return this.grpcService.get({ id });
    }

    async create(createParams) {
        return this.grpcService.create(createParams)
            .pipe(
                map((x: any) => x.comment)
            );
    }

    async update(updateParams) {
        return this.grpcService.update(updateParams)
            .pipe(
                map((x: any) => x.comment)
            );
    }

    async delete(id) {
        return this.grpcService.remove({ id })
            .pipe(
                map((x: any) => x.comment)
            );
    }

}
