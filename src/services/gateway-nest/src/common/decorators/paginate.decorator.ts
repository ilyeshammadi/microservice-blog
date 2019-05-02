import { Args } from "@nestjs/graphql";
import { Paginate } from "../dto/paginate.input";

export const PaginateArgs = () => Args({ name: 'paginate', type: () => Paginate, nullable: true })