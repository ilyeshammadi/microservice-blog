import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticleResolver } from "./articles.resolver";
import { CommentsService } from "src/comments/comments.service";
import { AuthService } from "src/auth/auth.service";


@Module({
    providers: [ArticleResolver, ArticlesService, CommentsService]
})
export class ArticlesModule { }