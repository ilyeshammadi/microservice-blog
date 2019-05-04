import { Resolver, Args, Query, ResolveProperty, Parent, Mutation } from "@nestjs/graphql";
import { ID } from "type-graphql";
import { CommentsService } from "./comments.service";
import { Comment } from "./types/comment.type";
import { Paginate } from "src/common/dto/paginate.input";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { PaginateArgs } from "src/common/decorators/paginate.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UseGuards } from "@nestjs/common";
import { User } from "src/common/decorators/user.decorator";
import { userInfo } from "os";
import { AuthorizationGuard } from "src/common/guards/authorization.guard";
import { HasAccessTo } from "src/common/decorators/has-access-to.decorator";
import { UsersService } from "src/users/users.service";


@Resolver(of => Comment)
export class CommentResolver {
    constructor(private readonly commentsService: CommentsService, private readonly usersService: UsersService) { }

    @Query(returns => [Comment], { nullable: true })
    comments(@PaginateArgs() paginate: Paginate) {
        return this.commentsService.list(null, paginate);
    }

    @Query(returns => Comment, { nullable: true })
    comment(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.commentsService.get(id)
    }

    @ResolveProperty()
    author(@Parent() parent) {
        return this.usersService.get(parent.authorId);
    }

    @UseGuards(AuthGuard, AuthorizationGuard)
    @HasAccessTo({ action: "create", subject: "Comment" })
    @Mutation(returns => Comment, { name: 'createComment', nullable: true })
    create(@User() user, @Args('input') createCommentInput: CreateCommentInput) {
        return this.commentsService.create({ authorId: user.id, ...createCommentInput })
    }

    @UseGuards(AuthGuard, AuthorizationGuard)
    @HasAccessTo({ action: "update", subject: "Comment", instance: true })
    @Mutation(returns => Comment, { name: 'updateComment', nullable: true })
    update(@User() user, @Args('input') updateCommentInput: UpdateCommentInput) {
        return this.commentsService.update({ authorId: user.id, ...updateCommentInput })
    }

    @UseGuards(AuthGuard, AuthorizationGuard)
    @HasAccessTo({ action: "delete", subject: "Comment", instance: true })
    @Mutation(returns => Comment, { name: 'deleteComment', nullable: true })
    delete(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.commentsService.delete(id)
    }

}