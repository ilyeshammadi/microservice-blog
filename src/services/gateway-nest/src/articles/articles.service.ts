import { Injectable } from "@nestjs/common";
import { Client, Transport, ClientGrpc, ClientOptions } from '@nestjs/microservices'
import { Article } from "./types/article.type";
import { reduce, map } from 'rxjs/operators';
import { articlesGrpcClientOptions } from "src/common/options/articles-grpc.option";

@Injectable()
export class ArticlesService {
    @Client(articlesGrpcClientOptions)
    client: ClientGrpc;

    grpcClient

    onModuleInit() {
        this.grpcClient = this.client.getService('GrpcService');
    }

    async list(query, paginate) {
        return this.grpcClient.list({ query, paginate })
            .pipe(reduce((acc, curr) => [curr, ...acc], []))
    }

    async get(id: string) {
        return this.grpcClient.get({ id });
    }

    async create(createParams) {
        return this.grpcClient.create(createParams)
            .pipe(
                map((x: any) => x.article)
            );
    }

    async update(updateParams) {
        return this.grpcClient.update(updateParams)
            .pipe(
                map((x: any) => x.article)
            );
    }

    async delete(id) {
        return this.grpcClient.remove({ id })
            .pipe(
                map((x: any) => x.article)
            );
    }
}