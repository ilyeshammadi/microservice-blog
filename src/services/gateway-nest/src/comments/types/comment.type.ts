import { ObjectType, Field, ID } from "type-graphql";
import { Article } from "src/articles/types/article.type";

@ObjectType()
export class Comment {
    @Field(type => ID)
    id: string

    @Field()
    content: string

    @Field(type => ID)
    articleId: string

    @Field(type => ID)
    authorId: string

}