import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { LoginResponse } from "./types/login-response.type";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(returns => LoginResponse)
    async login(@Args('loginInput') { username, password }: LoginInput) {
        const token = await this.authService.login(username, password);
        return { token };
    }
}
