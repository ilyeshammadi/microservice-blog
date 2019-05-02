import { Injectable } from "@nestjs/common";
import { User } from "./types/user.type";

const user = {
    id: '1234',
    username: 'ilyes'
}

@Injectable()
export class UsersService {

    list(query, paginate): User[] {
        return [user]
    }

    get(id): User {
        return user;
    }
}