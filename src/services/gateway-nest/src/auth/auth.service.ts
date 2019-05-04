import { Injectable } from "@nestjs/common";
import { authGrpcClientOptions } from "src/common/options/auth-grpc.option";
import { ClientGrpc, Client } from "@nestjs/microservices";

@Injectable()
export class AuthService {
    @Client(authGrpcClientOptions)
    client: ClientGrpc

    grpcService;

    onModuleInit() {
        this.grpcService = this.client.getService('GrpcService');
    }

    authenticate(token) {
        return this.grpcService.getUser({ token });
    }

    login(username, password) {
        return this.grpcService.login({ username, password });
    }
}