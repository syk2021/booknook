import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import comments from '../comments/index';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router();
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

// comments routes are included in posts
post.use('/comments', comments.routes());

// for get, delete, patch
posts.use('/:id', postsCtrl.getPostById, post.routes());
// // postsCtrl.checkObjectId is used in parts where id verification is needed
// // i.e. where '/:id' is present
// posts.get('/', postsCtrl.list);
// posts.post('/', checkLoggedIn, postsCtrl.write);
// posts.get('/:id', postsCtrl.getPostById, postsCtrl.read);
// posts.delete('/:id', checkLoggedIn, postsCtrl.getPostById, postsCtrl.checkOwnPost, postsCtrl.remove);
// posts.patch('/:id', checkLoggedIn, postsCtrl.getPostById, postsCtrl.checkOwnPost, postsCtrl.update);
// posts.use('/:id/comments', checkLoggedIn, postsCtrl.getPostById, comments.routes());
export default posts;