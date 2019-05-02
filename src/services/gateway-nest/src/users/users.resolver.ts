import { Args, Resolver, Query, ResolveProperty, Parent } from "@nestjs/graphql";
import { ID } from "type-graphql";
import { UsersService } from "./users.service";
import { User } from "./types/user.type";
import { Paginate } from "src/common/dto/paginate.input";
import { ArticlesService } from "src/articles/articles.service";
import { CommentsService } from "src/comments/comments.service";
import { PaginateArgs } from "src/common/decorators/paginate.decorator";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UsersService,
        private readonly articlesService: ArticlesService,
        private readonly commentsService: CommentsService) { }

    @Query(returns => User)
    async user(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.userService.get(id)
    }

    @Query(returns => [User])
    async users(@PaginateArgs() paginate: Paginate) {
        return await this.userService.list(null, paginate)
    }

    @ResolveProperty()
    async articles(@Parent() parent, @PaginateArgs() paginate: Paginate) {
        return await this.articlesService.list({ authorId: parent.id }, paginate);
    }

    @ResolveProperty()
    async comments(@Parent() parent, @PaginateArgs() paginate: Paginate) {
        return await this.commentsService.list({ authorId: parent.id }, paginate);
    }

}