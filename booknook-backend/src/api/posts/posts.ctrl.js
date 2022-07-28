import Post from '../../models/post';
// for comment function
// import Comment from '../../models/comment';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

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

// check if id is a proper id, else send 400 (error)
const { ObjectId } = mongoose.Types;
export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; // bad request
        return;
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
};

// this middleware checks if the post searched by id MATCHES id of user logged in
export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403; // returns 403 error if id DOES NOT match
        return;
    }
    return next();
};

/*
POST /api/posts
{
    title: 'title',
    body: 'body',
    tags: ['tag1', 'tag2']
}
*/
export const write = async ctx => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required()
    });
    
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400; // bad request
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body: sanitizeHtml(body, sanitizeOption),
        tags,
        user: ctx.state.user,
    });
    try {
        // await only valid in async function
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

const removeHtmlAndShorten = (body) => {
    const filtered = sanitizeHtml(body, {
      allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
  };

/*
GET /api/posts?username=&tag=&page=
*/
// show posts in reverse order (latest -> oldest)
export const list = async (ctx) => {
    const page = parseInt(ctx.query.page || '1', 10);

    if (page < 1) {
        ctx.status = 400;
        return;
    }

    // query: finds posts written by specific username || finds posts with specific tags
    const { tag, username } = ctx.query;
    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag } : {}),
    };
    try {
        // large _id means recent post, limit to 10 per page
        // page 2 will skip first 10 posts, page 3 will skip first 20 posts
        const posts = await Post.find(query).sort({ _id: -1 }).limit(10).skip((page - 1) * 10).lean().exec();
        // post count
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        
        ctx.body = posts.map((post) => ({
            ...post,
            body: removeHtmlAndShorten(post.body),
        }));
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
GET /api/posts/:id
*/
export const read = ctx => {
    ctx.body = ctx.state.post;
    // const { id } = ctx.params;
    // try {
    //     const post = await Post.findById(id).exec();
    //     if (!post) {
    //         ctx.status = 404; // Not found
    //         return;
    //     }
    //     ctx.body = post;
    // } catch (e) {
    //     ctx.throw(500, e);
    // }
};

/*
DELETE /api/posts/:id
*/
export const remove = async ctx => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        // // delete comment with post
        // await Comment.find({ post: postId }).remove().exec();
        ctx.status = 204; // No content
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
PATCH /api/posts/:id
{
    title: 'edit',
    body: 'edit content',
    tags: ['edit', 'tag']
}
*/
export const update = async (ctx) => {
    const { id } = ctx.params;
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400; // bad request
        ctx.body = result.error;
        return;
    }

    const nextData = { ...ctx.request.body };
    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }
    try {
        const post = await Post.findByIdAndUpdate(id, nextData, {
            new: true, // returns value after update
            // if false, returns data before update
        }).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
};