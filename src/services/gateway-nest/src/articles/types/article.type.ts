import { ObjectType, Field, ID } from "type-graphql";
import { Comment } from "src/comments/types/comment.type";


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

    @Field(type => [Comment], { nullable: true })
    comments: Comment[]

}

