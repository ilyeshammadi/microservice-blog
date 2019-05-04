import { InputType, Field, ID } from "type-graphql";

@InputType()
export class UpdateCommentInput {
    @Field(type => ID)
    id: string

    @Field()
    content: string
}