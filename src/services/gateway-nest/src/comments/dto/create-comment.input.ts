import { InputType, Field, ID } from "type-graphql";

@InputType()
export class CreateCommentInput {
    @Field()
    content: string

    @Field(type => ID)
    articleId: string
}