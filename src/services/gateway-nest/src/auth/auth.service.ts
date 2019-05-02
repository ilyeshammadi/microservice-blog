import { Injectable } from "@nestjs/common";

const user = {
    id: '1234',
    username: 'ilyes'
}

const token = '12345'

@Injectable()
export class AuthService {
    async authenticate(token) {
        return user
    }

    async login(username, password) {
        return token;
    }
}