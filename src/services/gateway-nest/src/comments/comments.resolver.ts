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


@Resolver(of => Comment)
export class CommentResolver {
    constructor(private readonly commentsService: CommentsService) { }

    @Query(returns => [Comment], { nullable: true })
    comments(@PaginateArgs() paginate: Paginate) {
        return this.commentsService.list(null, paginate);
    }

    @Query(returns => Comment, { nullable: true })
    comment(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.commentsService.get(id)
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Comment, { name: 'createComment', nullable: true })
    create(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
        return this.commentsService.create(createCommentInput)
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Comment, { name: 'updateComment', nullable: true })
    update(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
        return this.commentsService.update(updateCommentInput)
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Comment, { name: 'deleteComment', nullable: true })
    delete(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.commentsService.delete(id)
    }

}