import { ObjectType, Field } from "type-graphql";


@ObjectType()
export class LoginResponse {
    @Field(type => String)
    token: string
} 