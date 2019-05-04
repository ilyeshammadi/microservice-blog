import { createGrpcClient } from "src/common/create-grpc-client.util";

export class AuthorizationGrpcService {
    grpcClient;
    constructor() {
        this.grpcClient = createGrpcClient('authorization');
    }

    async can(request) {
        return await new Promise((resolve, reject) => {
            this.grpcClient.can(request, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    }

    async canOnInstance(request) {
        return await new Promise((resolve, reject) => {
            this.grpcClient.canOnInstance(request, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    }

}



