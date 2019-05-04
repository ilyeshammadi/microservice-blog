import { createGrpcClient } from "src/common/create-grpc-client.util";

export class AuthGrpcService {
    authServiceGrpcClient: any;
    constructor() {
        this.authServiceGrpcClient = createGrpcClient('auth');
    }

    async authenticate(token) {
        return await new Promise((resolve, reject) => {
            this.authServiceGrpcClient.getUser({ token }, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
}