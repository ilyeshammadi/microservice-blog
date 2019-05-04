import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';
import { ArticlesService } from 'src/articles/articles.service';
import { CommentsService } from 'src/comments/comments.service';

@Module({
    providers: [UserResolver, UsersService, ArticlesService, CommentsService]
})
export class UsersModule { }
