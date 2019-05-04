import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { LoginResponse } from "./types/login-response.type";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { RegisterResponse } from "./types/register-response.type";
import { UsersService } from "src/users/users.service";
import { RegisterInput } from "./dto/register.input";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }

    @Mutation(returns => LoginResponse)
    login(@Args('loginInput') { username, password }: LoginInput) {
        return this.authService.login(username, password);
    }

    @Mutation(returns => RegisterResponse)
    register(@Args('registerInput') { username, password }: RegisterInput) {
        return this.usersService.create(username, password);
    }
}
