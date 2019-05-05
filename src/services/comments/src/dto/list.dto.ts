import { IsString, IsInt, Min, Max } from "class-validator";

class Query {
    @IsString()
    authorId: string
}

class Paginate {
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number

    @IsInt()
    @Min(1)
    page: number

}

export class ListDto {
    query: Query
    paginate: Paginate
}