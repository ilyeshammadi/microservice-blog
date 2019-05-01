import { Injectable } from "@nestjs/common";
import { Article } from "./types/article.type";

const article = {
    id: "345",
    title: "foo",
    content: "ddd",
    authorId: "1234"
}

@Injectable()
export class ArticleService {
    async list(query, paginate) {
        return [article]
    }

    async get(id: string) {
        return article;
    }

    async create(createParams) {
        return article
    }

    async update(updateParams) {
        return article
    }

    async delete(deleteParams) {
        return article
    }
}