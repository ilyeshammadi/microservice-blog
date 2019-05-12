import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticleResolver } from "./articles.resolver";
import { CommentsService } from "src/comments/comments.service";
import { UsersService } from "src/users/users.service";


@Module({
    providers: [ArticleResolver, ArticlesService, CommentsService, UsersService]
})
export class ArticlesModule { }