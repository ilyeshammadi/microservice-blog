import { Resolver, Args, Query, ResolveProperty, Parent, Mutation } from "@nestjs/graphql";
import { ID } from "type-graphql";
import { CommentsService } from "./comments.service";
import { Comment } from "./types/comment.type";
import { Paginate } from "src/common/dto/paginate.input";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";


@Resolver(of => Comment)
export class CommentResolver {
    constructor(private readonly commentsService: CommentsService) { }

    @Query(returns => [Comment])
    async comments(@Args({ name: 'paginate', type: () => Paginate, nullable: true }) paginate: Paginate) {
        return await this.commentsService.list(null, paginate);
    }

    @Query(returns => Comment)
    async comment(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.commentsService.get(id)
    }

    @Mutation(returns => Comment, { name: 'createComment' })
    async create(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
        return this.commentsService.create(createCommentInput)
    }

    @Mutation(returns => Comment, { name: 'updateComment' })
    async update(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
        return this.commentsService.update(updateCommentInput)
    }

    @Mutation(returns => Comment, { name: 'deleteComment' })
    async delete(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.commentsService.delete(id)
    }

}