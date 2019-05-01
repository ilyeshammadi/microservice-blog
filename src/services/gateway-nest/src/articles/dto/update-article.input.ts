import { InputType, Field, ID } from "type-graphql";

@InputType()
export class UpdateArticleInput {
    @Field(returns => ID)
    id: string

    @Field(returns => String, { nullable: true })
    title: string

    @Field(returns => String, { nullable: true })
    content: string
}