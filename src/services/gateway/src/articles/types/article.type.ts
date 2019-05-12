import { ObjectType, Field, ID } from "type-graphql";
import { Comment } from "src/comments/types/comment.type";
import { User } from "src/users/types/user.type";


@ObjectType()
export class Article {
    @Field(type => ID)
    id: string

    @Field()
    title: string

    @Field()
    content: string

    @Field()
    authorId: string

    @Field(type => User)
    author: User

    @Field(type => [Comment], { nullable: true })
    comments: Comment[]

}

