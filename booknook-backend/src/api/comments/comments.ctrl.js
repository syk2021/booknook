import Post from '../../models/post';
import Comment from '../../models/comment';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;
export const getCommentById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            ctx.status = 404;
            return;
        }
        ctx.state.comment = comment;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
};

const sanitizeOption = {
    allowedTags: [
      'h1',
      'h2',
      'b',
      'i',
      'u',
      's',
      'p',
      'ul',
      'ol',
      'li',
      'blockquote',
      'a',
      'img',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src'],
      li: ['class'],
    },
    allowedSchemes: ['data', 'http'],
  };

export const write = async (ctx) => {
    const schema = Joi.object().keys({
        postId: Joi.string().required(),
        body: Joi.string().required(),
        clickedEdit: Joi.boolean(),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const body = ctx.request.body.body;
    const comment = new Comment({
        postId: ctx.params.postId,
        authorId: ctx.state.user._id,
        body: body.toString(),
        clickedEdit: false,
    });
    try {
        await comment.save();
        ctx.body = comment;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const list = async (ctx) => {
    try {
        const comments = await Comment.find({ postId: ctx.params.postId })
        .populate('authorId', 'username')
        .sort({ createdAt: 1})
        .lean()
        .exec();
        console.log(comments);
        ctx.body= comments;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const update = async (ctx) => {
    const { commentId } = ctx.params;
    console.log(commentId);
    const schema = Joi.object().keys({
        postId: Joi.string(),
        commentId: Joi.string(),
        body: Joi.string(),
        clickedEdit: Joi.boolean(),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400; // Bad request
        ctx.body = result.error;
        return;
    }

    const newData = {...ctx.request.body};
    if (newData.body) {
        newData.body = sanitizeHtml(newData.body, sanitizeOption);
    }
    try {
        const comment = await Comment.findByIdAndUpdate(commentId, newData, {
            new: true,
        }).exec();
        if (!comment) {
            ctx.status = 404;
            return;
        }
        
        // set clickedEdit back to false, because we have now updated it
        comment.clickedEdit = false;
        ctx.body = comment;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const remove = async (ctx) => {
    const { commentId } = ctx.params;
    try {
        await Comment.findByIdAndRemove(commentId).exec();
        const comments = await Comment.find({ postId: ctx.params.postId })
        .populate('authorId', 'username')
        .sort({ createdAt: 1 })
        .lean()
        .exec();
        ctx.body = comments;
    } catch (e) {
        ctx.throw(500, e);
    }
};
