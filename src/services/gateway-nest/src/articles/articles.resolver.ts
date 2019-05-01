import { Resolver, Query, Args, ResolveProperty, Mutation, Parent } from "@nestjs/graphql";
import { ID } from "type-graphql";
import { Article } from "./types/article.type";
import { ArticleService } from "./articles.service";
import { Comment } from "src/comments/types/comment.type";
import { CommentsService } from "src/comments/comments.service";
import { Paginate } from "src/common/dto/paginate.input";
import { CreateArticleInput } from "./dto/create-article.input";
import { UpdateArticleInput } from "./dto/update-article.input";



@Resolver(of => Article)
export class ArticleResolver {
    constructor(private readonly articleService: ArticleService, private readonly commentsService: CommentsService) { }

    @Query(returns => [Article])
    async articles(@Args({ name: 'paginate', type: () => Paginate, nullable: true }) paginate: Paginate) {
        return await this.articleService.list(null, paginate);
    }

    @Query(returns => Article)
    async article(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.articleService.get(id);
    }

    @ResolveProperty()
    async comments(@Parent() parent, @Args({ name: 'paginate', type: () => Paginate, nullable: true }) paginate: Paginate) {
        return await this.commentsService.list({ articleId: parent.id }, paginate);
    }

    @Mutation(returns => Article, { name: 'createArticle' })
    async create(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
        return this.articleService.create(createArticleInput)
    }

    @Mutation(returns => Article, { name: 'updateArticle' })
    async update(@Args('updateArticleInput') updateArticleInput: UpdateArticleInput) {
        return this.articleService.update(updateArticleInput)
    }

    @Mutation(returns => Article, { name: 'deleteArticle' })
    async delete(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.articleService.delete(id)
    }

}