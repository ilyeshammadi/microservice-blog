import { ObjectType, Field, ID } from "type-graphql";
import { Article } from "src/articles/types/article.type";
import { User } from "src/users/types/user.type";

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

    @Field(type => User)
    author: User

}