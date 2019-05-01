import { InputType, Field } from "type-graphql";

@InputType()
export class CreateArticleInput {
    @Field(returns => String)
    title: string

    @Field(returns => String)
    content: string
}