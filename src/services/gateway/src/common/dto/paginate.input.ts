import { Max, Min } from "class-validator";
import { Field, Int, InputType } from "type-graphql";

@InputType()
export class Paginate {
    @Field(type => Int)
    @Min(1)
    @Max(50)
    limit: number = 25

    @Field(type => Int)
    @Min(1)
    page: number = 1
}