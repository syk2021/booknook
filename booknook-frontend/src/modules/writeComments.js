import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as commentsAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'comment/INITIALIZE';
const CHANGE_INPUT = 'comment/CHANGE_INPUT';
const [ WRITE_COMMENT, WRITE_COMMENT_SUCCESS, WRITE_COMMENT_FAILURE ] = createRequestActionTypes('comment/WRITE_COMMENT');

export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT, (body) => body);
// writeComments called in CommentsViewerContainer
export const writeComments = createAction(WRITE_COMMENT, ( postId, body ) => ({ postId, body }));

// set original comment
const SET_ORIGINAL_COMMENT = 'comment/SET_ORIGINAL_COMMENT';
// setOriginalComment called in CommentsViewerContainer
export const setOriginalComment = createAction(SET_ORIGINAL_COMMENT, comment => comment);

// update comment
const [ UPDATE_COMMENT, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAILURE ] = createRequestActionTypes('comment/UPDATE_COMMENT');
// updateComment called in CommentsViewerContainer
export const updateComment = createAction(UPDATE_COMMENT, ({ postId, commentId, body }) => ({
    postId,
    commentId,
    body,
}));

// const ONEDITCLICK = 'comment/ONEDITCLICK';
// // onEditClick called in CommetsViewerContainer
// export const onEditClick = createAction(ONEDITCLICK, ({ postId, commentId }) => ({ postId, commentId }));

const writeSaga = createRequestSaga(WRITE_COMMENT, commentsAPI.writeComment);
const updateCommentSaga = createRequestSaga(UPDATE_COMMENT, commentsAPI.updateComment);
// const onEditClickSaga = createRequestSaga(ONEDITCLICK, commentsAPI.clickedEditComment);

export function* writeCommentsSaga() {
    yield takeLatest(WRITE_COMMENT, writeSaga);
    yield takeLatest(UPDATE_COMMENT, updateCommentSaga);
    // yield takeLatest(ONEDITCLICK, onEditClickSaga);
}

const initialState = {
    body: '',
    comment: '',
    commentError: null,
    originalCommentId: null,
};

const writeComment = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_INPUT]: (state, { payload: body }) => ({
            ...state,
            body: body,
        }),
        [WRITE_COMMENT]: state => ({
            ...state,
            body: '',
            comment: null,
            commentError: null,
        }),
        [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
            ...state,
            comment,
        }),
        [WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
            ...state,
            commentError,
        }),
        [SET_ORIGINAL_COMMENT]: (state, { payload: comment }) => ({
            ...state,
            body: comment.body,
            originalCommentId: comment._id,
            // clickedEdit: !state.clickedEdit,
        }),
        [UPDATE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
            ...state,
            comment,
            // clickedEdit: true, 
        }),
        [UPDATE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
            ...state,
            commentError,
        }),
        // [ONEDITCLICK]: (state, { payload: comment }) => ({
        //     ...state,
        //     comment,
        // }),
        },
    initialState,
);

export default writeComment;