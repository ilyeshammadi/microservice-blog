import { Injectable } from '@nestjs/common';
import { logger } from '../common/js/tools';
import { Comment } from './app.models';
import { ListDto } from './dto/list.dto';
import { GetDto } from './dto/get.dto';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';

@Injectable()
export class Service {
  async list({ query, paginate }: ListDto) {
    try {
      // Get the list of comments
      const { docs } = await Comment.paginate(query, paginate);
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

  async get({ id }: GetDto) {
    try {
      // Get one comment
      const comment = await Comment.findOne({ _id: id });
      // Throw error if not found
      if (!comment) { throw Error(); }
      return comment;
    } catch (error) {
      logger.error({
        message: 'comment not found',
        payload: {
          args: { id },
          endpoint: 'get',
        },
      });
      throw Error(error);
    }
  }

  async create(createComment: CreateDto) {
    try {
      const comment = new Comment(createComment);
      const commentCreated = await comment.save();
      return { comment: commentCreated };
    } catch (error) {
      logger.error({
        message: 'can not create comment',
        payload: {
          args: createComment,
          endpoint: 'create',
        },
      });
      throw Error(error);
    }
  }
  async update(updateCommentDto: UpdateDto) {
    try {
      const query = { _id: updateCommentDto.id };
      delete updateCommentDto.id;
      await Comment.findOneAndUpdate(query, updateCommentDto);
      const commentUpdated = await Comment.findOne(query);
      return { comment: commentUpdated };
    } catch (error) {
      logger.error({
        message: 'comment not found',
        payload: {
          args: updateCommentDto,
          endpoint: 'update',
        },
      });
      throw Error(error);
    }
  }
  async remove({ id }: DeleteDto) {
    try {
      const query = { _id: id };
      const comment = await Comment.findOne(query);
      comment.remove();

      return {
        comment,
        ok: true,
      };
    } catch (error) {
      logger.error({
        message: 'comment not found',
        payload: {
          args: { id },
          endpoint: 'remove',
        },
      });
      throw Error(error);
    }
  }


  async removeMany(query) {
    try {
      const comments = await Comment.find(query);
      await Comment.deleteMany(query);
      logger.info(`${comments.length} comment deleted`);
      return {
        comments,
        ok: true
      };
    } catch (error) {
      logger.error({
        message: "invalid arguments",
        payload: {
          args: { query },
          endpoint: "removeMany"
        }
      });
      throw Error(error);
    }
  }

}
