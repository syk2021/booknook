import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as commentAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

// list comment
const [ LIST_COMMENT, LIST_COMMENT_SUCCESS, LIST_COMMENT_FAILURE ] = createRequestActionTypes('comments/LIST_COMMENTS');
export const listComments = createAction( LIST_COMMENT, (postId) => postId);

// remove comment
const [REMOVE_COMMENT, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE] = createRequestActionTypes('comments/REMOVE_COMMENTS');
export const removeComment = createAction(REMOVE_COMMENT, (postId, commentId) => ({ postId, commentId }));

// ask before removing comment
const TOGGLE_ASK_REMOVE = 'comment/TOGGLE_ASK_REMOVE';
export const toggleAskRemove = createAction(TOGGLE_ASK_REMOVE);

// cancel remove comment
const CANCEL_REMOVE_COMMENT = 'comment/CANCEL_REMOVE_COMMENT';
export const cancelRemoveComment = createAction(CANCEL_REMOVE_COMMENT);

const listCommentSaga = createRequestSaga(LIST_COMMENT, commentAPI.listComments);
const removeCommentSaga = createRequestSaga(REMOVE_COMMENT, commentAPI.removeComment);

export function* CommentsSaga() {
    yield takeLatest(LIST_COMMENT, listCommentSaga);
    yield takeLatest(REMOVE_COMMENT, removeCommentSaga);
}

const initialState = {
    comments: null,
    error: null,
    askRemove: false,
    removeComment: {
        commentId: null,
    }
};

const comments = handleActions(
    {
        [LIST_COMMENT_SUCCESS]: (state, { payload: comments}) => ({
            ...state,
            comments,
        }),
        [LIST_COMMENT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [REMOVE_COMMENT]: (state) => ({
            ...state,
            comments: comments,
        }),
        [REMOVE_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
            ...state,
            comments: comments,
        }),
        [REMOVE_COMMENT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [TOGGLE_ASK_REMOVE]: (state, { payload: commentId }) => ({
            ...state,
            askRemove: !state.askRemove,
            removeComment: {
                commentId: commentId,
            },
        }),
        [CANCEL_REMOVE_COMMENT]: (state) => ({
            ...state,
            askRemove: !state.askRemove,
            removeComment: {
                commentId: null,
            },
        }),
    },
    initialState,
);

export default comments;