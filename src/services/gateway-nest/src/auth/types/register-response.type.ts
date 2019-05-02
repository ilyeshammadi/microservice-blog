import { ObjectType, Field, ID } from "type-graphql";


@ObjectType()
export class RegisterResponse {
    @Field(type => ID)
    id: string

    @Field(type => String)
    username: string
} 