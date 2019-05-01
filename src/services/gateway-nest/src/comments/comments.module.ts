import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentResolver } from './comments.resolver';

@Module({
    providers: [CommentsService, CommentResolver]
})
export class CommentsModule { }
