import { ObjectType, Field, ID } from "type-graphql";
import { Article } from "src/articles/types/article.type";
import { Comment } from "src/comments/types/comment.type";

@ObjectType()
export class User {
    @Field(type => ID)
    id: string

    @Field(type => String)
    username: string

    @Field(type => [Article], { nullable: true })
    articles?: Article[]

    @Field(type => [Comment], { nullable: true })
    comments?: Comment[]

}