import { Injectable } from '@nestjs/common';
import { logger, events, emitEvent } from '../common/js/tools';
import { Article } from './models';
import { ListRequest } from './interfaces';

@Injectable()
export class Service {
  async list(
    { query, paginator }: ListRequest = { paginator: { limit: 100, page: 1 } },
  ) {
    try {
      // Get the list of articles
      const { docs } = await Article.paginate(query, paginator);

      logger.info({
        message: 'articles fetched',
        payload: {
          args: { query, paginator },
          endpoint: 'list',
        },
      });

      return docs;
    } catch (error) {
      logger.error({
        error,
        message: 'invalid arguments',
        payload: {
          args: { query, paginator },
          endpoint: 'list',
        },
      });
      return [];
    }
  }

  async get({ id }) {
    try {
      // Get one article
      const article = await Article.findOne({ _id: id });
      // Throw error if not found
      if (!article) throw Error();
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

  async create(article) {
    try {
      const articleModel = new Article(article);
      const articleCreated = await articleModel.save();
      logger.info({
        message: 'article created',
        payload: {
          args: article,
          endpoint: 'create',
        },
      });
      return { article: articleCreated };
    } catch (error) {
      logger.error({
        message: 'can not create article',
        payload: {
          args: article,
          endpoint: 'create',
        },
      });
      throw Error(error);
    }
  }
  async update(article) {
    try {
      const query = { _id: article.id };
      delete article.id;
      await Article.findOneAndUpdate(query, article);
      const articleUpdated = await Article.findOne(query);

      logger.info({
        message: 'article updated',
        payload: {
          args: article,
          endpoint: 'update',
        },
      });

      return { article: articleUpdated };
    } catch (error) {
      logger.error({
        message: 'article not found',
        payload: {
          args: article,
          endpoint: 'update',
        },
      });
      throw Error(error);
    }
  }
  async remove({ id }) {
    try {
      const query = { _id: id };
      const article = await Article.findOne(query);
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
