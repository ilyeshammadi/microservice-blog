import { Resolver, Query, Args, ResolveProperty, Mutation, Parent } from "@nestjs/graphql";
import { ID } from "type-graphql";
import { Article } from "./types/article.type";
import { ArticlesService } from "./articles.service";
import { CommentsService } from "src/comments/comments.service";
import { Paginate } from "src/common/dto/paginate.input";
import { CreateArticleInput } from "./dto/create-article.input";
import { UpdateArticleInput } from "./dto/update-article.input";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UseGuards } from "@nestjs/common";
import { PaginateArgs } from "src/common/decorators/paginate.decorator";
import { HasAccessTo } from "src/common/decorators/has-access-to.decorator";
import { AuthorizationGuard } from "src/common/guards/authorization.guard";
import { UserEntity } from "src/common/decorators/user-entity.decorator";


@Resolver(of => Article)
export class ArticleResolver {
    constructor(private readonly articleService: ArticlesService, private readonly commentsService: CommentsService) { }

    @Query(returns => [Article])
    articles(@PaginateArgs() paginate: Paginate) {
        return this.articleService.list(null, paginate);
    }

    @Query(returns => Article)
    article(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.articleService.get(id);
    }

    @ResolveProperty()
    comments(@Parent() parent, @PaginateArgs() paginate: Paginate) {
        return this.commentsService.list({ articleId: parent.id }, paginate);
    }

    @UseGuards(AuthGuard, AuthorizationGuard)
    @HasAccessTo({ action: "create", subject: "Article" })
    @Mutation(returns => Article, { name: 'createArticle' })
    create(@UserEntity() user, @Args('input') createArticleInput: CreateArticleInput) {
        return this.articleService.create({ authorId: user.id, ...createArticleInput })
    }

    @UseGuards(AuthGuard, AuthorizationGuard)
    @HasAccessTo({ action: "update", subject: "Article", instance: true })
    @Mutation(returns => Article, { name: 'updateArticle' })
    update(@UserEntity() user, @Args('input') updateArticleInput: UpdateArticleInput) {
        return this.articleService.update({ authorId: user.id, ...updateArticleInput })
    }

    @UseGuards(AuthGuard, AuthorizationGuard)
    @HasAccessTo({ action: "delete", subject: "Article", instance: true })
    @Mutation(returns => Article, { name: 'deleteArticle' })
    delete(@Args({ name: 'id', type: () => ID }) id: string) {
        return this.articleService.delete(id)
    }

}