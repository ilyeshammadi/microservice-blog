const { logger } = require("../common/js/tools");
const { Comment } = require("./models");

async function list({ query, paginate }) {
  try {
    // Get the list of comments
    const { docs } = await Comment.paginate(query, paginate);

    logger.info({
      message: "comments fetched",
      payload: {
        args: { query, paginate },
        endpoint: "list"
      }
    });

    return docs;
  } catch (error) {
    logger.error({
      error,
      message: "invalid arguments",
      payload: {
        args: { query, paginate },
        endpoint: "list"
      }
    });
    return [];
  }
}

async function get({ id }) {
  try {
    // Get one comment
    const comment = await Comment.findOne({ _id: id });
    // Throw error if not found
    if (!comment) throw Error();
    logger.info({
      message: "comment fetched",
      payload: {
        args: { id },
        endpoint: "get"
      }
    });
    return comment;
  } catch (error) {
    logger.error({
      message: "comment not found",
      payload: {
        args: { id },
        endpoint: "get"
      }
    });
    throw Error(error);
  }
}

async function create(comment) {
  try {
    const commentModel = new Comment(comment);
    const commentCreated = await commentModel.save();
    logger.info({
      message: "comment created",
      payload: {
        args: comment,
        endpoint: "create"
      }
    });
    return { comment: commentCreated };
  } catch (error) {
    logger.error({
      message: "can not create comment",
      payload: {
        args: comment,
        endpoint: "create"
      }
    });
    throw Error(error);
  }
}

async function update(comment) {
  try {
    const query = { _id: comment.id };
    delete comment.id;
    await Comment.findOneAndUpdate(query, comment);
    const commentUpdated = await Comment.findOne(query);

    logger.info({
      message: "comment updated",
      payload: {
        args: comment,
        endpoint: "update"
      }
    });

    return { comment: commentUpdated };
  } catch (error) {
    logger.error({
      message: "comment not found",
      payload: {
        args: comment,
        endpoint: "update"
      }
    });
    throw Error(error);
  }
}

async function remove({ id }) {
  try {
    const query = { _id: id };
    const comment = await Comment.findOne(query);
    comment.remove();

    logger.info({
      message: "comment deleted",
      payload: {
        args: { id },
        endpoint: "remove"
      }
    });

    return {
      comment,
      ok: true
    };
  } catch (error) {
    logger.error({
      message: "comment not found",
      payload: {
        args: { id },
        endpoint: "remove"
      }
    });
    throw Error(error);
  }
}

async function removeMany({ query }) {
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

module.exports = {
  list,
  get,
  create,
  update,
  remove,
  removeMany
};
