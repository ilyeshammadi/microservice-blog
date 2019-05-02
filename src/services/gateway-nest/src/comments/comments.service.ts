import { Injectable } from '@nestjs/common';
import { Comment } from './types/comment.type';

const comment = {
    id: "1234",
    content: "wooow",
    articleId: "345",
    authorId: "1234"
}

@Injectable()
export class CommentsService {
    list(query, paginate): Comment[] {
        return [comment]
    }

    get(id: string): Comment {
        return comment;
    }

    async create(createParams) {
        return comment
    }

    async update(updateParams) {
        return comment
    }

    async delete(deleteParams) {
        return comment
    }

}
