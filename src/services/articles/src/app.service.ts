import { Injectable } from '@nestjs/common';
import { emitEvent, events, logger } from '../common/js/tools';
import { Article } from './interfaces/article.interface';
import { Article as ArticleModel } from './app.models';
import { ListDto } from './dto/list.dto';
import { GetDto } from './dto/get.dto';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';

@Injectable()
export class Service {
  async list({ query, paginate }: ListDto): Promise<Article[]> {
    try {
      // Get the list of articles
      const { docs } = await ArticleModel.paginate(query, paginate);

      logger.info({
        message: 'articles fetched',
        payload: {
          args: { query, paginate },
          endpoint: 'list',
        },
      });

      return docs;
    } catch (error) {
      logger.error({
        error,
        message: 'invalid arguments',
        payload: {
          args: { query, paginate },
          endpoint: 'list',
        },
      });
      return [];
    }
  }

  async get({ id }: GetDto): Promise<Article> {
    try {
      // Get one article
      const article = await ArticleModel.findOne({ _id: id });
      // Throw error if not found
      if (!article) { throw Error(); }
      logger.info({
        message: 'article fetched',
        payload: {
          args: { id },
          endpoint: 'get',
        },
      });
      return article;
    } catch (error) {
      logger.error({
        message: 'article not found',
        payload: {
          args: { id },
          endpoint: 'get',
        },
      });
      throw Error(error);
    }
  }

  async create(createArticle: CreateDto): Promise<{ article: Article }> {
    try {
      const articleModel = new ArticleModel(createArticle);
      const articleCreated = await articleModel.save();
      logger.info({
        message: 'article created',
        payload: {
          args: createArticle,
          endpoint: 'create',
        },
      });
      return { article: articleCreated };
    } catch (error) {
      logger.error({
        message: 'can not create article',
        payload: {
          args: createArticle,
          endpoint: 'create',
        },
      });
      throw Error(error);
    }
  }
  async update(updateArticleDto: UpdateDto): Promise<{ article: Article }> {
    try {
      const query = { _id: updateArticleDto.id };
      delete updateArticleDto.id;
      await ArticleModel.findOneAndUpdate(query, updateArticleDto);
      const articleUpdated = await ArticleModel.findOne(query);

      logger.info({
        message: 'article updated',
        payload: {
          args: updateArticleDto,
          endpoint: 'update',
        },
      });

      return { article: articleUpdated };
    } catch (error) {
      logger.error({
        message: 'article not found',
        payload: {
          args: updateArticleDto,
          endpoint: 'update',
        },
      });
      throw Error(error);
    }
  }
  async remove({ id }: DeleteDto): Promise<{ article: Article; ok: Boolean }> {
    try {
      const query = { _id: id };
      const article = await ArticleModel.findOne(query);
      article.remove();

      // Publish the event
      emitEvent(events.ARTICLE_DELETED, { id });

      logger.info({
        message: 'article deleted',
        payload: {
          args: { id },
          endpoint: 'remove',
        },
      });

      return {
        article,
        ok: true,
      };
    } catch (error) {
      logger.error({
        message: 'article not found',
        payload: {
          args: { id },
          endpoint: 'remove',
        },
      });
      throw Error(error);
    }
  }
}
