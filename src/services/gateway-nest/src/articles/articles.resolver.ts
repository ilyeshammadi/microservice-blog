import { Resolver, Query, Args, ResolveProperty, Mutation, Parent } from "@nestjs/graphql";
import { ID } from "type-graphql";
import { Article } from "./types/article.type";
import { ArticlesService } from "./articles.service";
import { CommentsService } from "src/comments/comments.service";
import { Paginate } from "src/common/dto/paginate.input";
import { CreateArticleInput } from "./dto/create-article.input";
import { UpdateArticleInput } from "./dto/update-article.input";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UseGuards, createParamDecorator } from "@nestjs/common";
import { PaginateArgs } from "src/common/decorators/paginate.decorator";


@Resolver(of => Article)
export class ArticleResolver {
    constructor(private readonly articleService: ArticlesService, private readonly commentsService: CommentsService) { }

    @Query(returns => [Article])
    async articles(@PaginateArgs() paginate: Paginate) {
        return await this.articleService.list(null, paginate);
    }

    @Query(returns => Article)
    async article(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.articleService.get(id);
    }

    @ResolveProperty()
    async comments(@Parent() parent, @PaginateArgs() paginate: Paginate) {
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

    @UseGuards(AuthGuard)
    @Mutation(returns => Article, { name: 'deleteArticle' })
    async delete(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.articleService.delete(id)
    }

}