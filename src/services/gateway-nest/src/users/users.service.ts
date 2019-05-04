import { Injectable } from "@nestjs/common";
import { User } from "./types/user.type";
import { Client, ClientGrpc } from "@nestjs/microservices";
import { usersGrpcClientOptions } from "src/common/options/users-grpc.option";
import { reduce, map } from "rxjs/operators";

@Injectable()
export class UsersService {
    @Client(usersGrpcClientOptions)
    client: ClientGrpc

    grpcClient

    onModuleInit() {
        this.grpcClient = this.client.getService('GrpcService');
    }

    list(query, paginate) {
        return this.grpcClient.list({ query, paginate })
            .pipe(reduce((acc, curr) => [curr, ...acc], []));
    }

    get(id) {
        return this.grpcClient.get({ id });
    }

    create(username, password) {
        return this.grpcClient.create({ username, password })
            .pipe(
                map((x: any) => x.user)
            );
    }
}