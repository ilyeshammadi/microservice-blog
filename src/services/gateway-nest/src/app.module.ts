import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGrpcService } from './auth/auth.grpc';
import { AuthorizationModule } from './authorization/authorization.module';

const authGrpcService = new AuthGrpcService();

@Module({
  imports: [
    ArticlesModule,
    CommentsModule,
    UsersModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: async ({ req }) => {
        const token = req.headers.authorization;

        try {
          if (token) {
            const user = await authGrpcService.authenticate(token);
            return { user };
          }
        } catch (error) {
          return {}
        }
      }
    }),
    AuthorizationModule,
  ],
})
export class AppModule { }
