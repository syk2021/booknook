import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import writeComment, { writeCommentsSaga } from './writeComments';
import listComments, { CommentsSaga } from './listComments';
import comments from './listComments';
import removeComment from './listComments';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
    post,
    posts,
    writeComment,
    listComments,
    comments,
    removeComment,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga(), writeCommentsSaga(), CommentsSaga()]);
}

export default rootReducer;