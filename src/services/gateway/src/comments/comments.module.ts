import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentResolver } from './comments.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
    providers: [CommentsService, CommentResolver, UsersService]
})
export class CommentsModule { }
