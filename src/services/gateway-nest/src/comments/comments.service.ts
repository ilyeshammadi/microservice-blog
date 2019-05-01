import { Injectable } from '@nestjs/common';
import { Comment } from './types/comment.type';

const comment = {
    id: "",
    content: "",
    articleId: "",
    authorId: ""
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
