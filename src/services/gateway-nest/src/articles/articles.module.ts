import { Module } from "@nestjs/common";
import { ArticleService } from "./articles.service";
import { ArticleResolver } from "./articles.resolver";
import { CommentsService } from "src/comments/comments.service";


@Module({
    providers: [ArticleResolver, ArticleService, CommentsService]
})
export class ArticlesModule { }