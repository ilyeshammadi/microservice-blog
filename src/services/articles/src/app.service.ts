import { Injectable } from '@nestjs/common';
import { events, logger } from '../common/js/tools';
import { Article } from './interfaces/article.interface';
import { Article as ArticleModel } from './app.models';
import { ListDto } from './dto/list.dto';
import { GetDto } from './dto/get.dto';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';
import { natsClientOptions } from './options/nats-client.option';
import { Client, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class Service {
  @Client(natsClientOptions)
  client: ClientProxy


  async onModuleInit() {
    await this.client.connect();
  }

  async list({ query, paginate }: ListDto): Promise<Article[]> {
    try {
      // Get the list of articles
      const { docs } = await ArticleModel.paginate(query, paginate);
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
      await this.client.emit(events.ARTICLE_DELETED, { id }).toPromise();

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
