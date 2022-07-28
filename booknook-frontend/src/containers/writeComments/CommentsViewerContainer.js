import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentsViewer from '../../components/writeComments/CommentsViewer';
import { changeInput, writeComments, updateComment, setOriginalComment } from '../../modules/writeComments';
import { listComments, removeComment, cancelRemoveComment, toggleAskRemove } from '../../modules/listComments';

import AskModal from '../../components/common/AskModal';

const CommentsViewerContainer = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    // const [editVal, setEditVal] = useState(0);

    const { body, user, comments, loading, commentId, askRemove, originalCommentId }  = useSelector(({ writeComment, user, listComments, loading }) => ({
        body: writeComment.body,
        user: user.user,
        comments: listComments.comments,
        loading: loading['comments/LIST_COMMENTS'],
        commentId: listComments.removeComment.commentId,
        askRemove: listComments.askRemove,
        originalCommentId: writeComment.originalCommentId,
    }));

    // dispatch list comments
    useEffect(() => {
        dispatch(listComments(postId));
    }, [dispatch, postId]);

    // change comment input when input changes
    const onChangeCommentInput = useCallback(
        (body) => dispatch(changeInput(body)), [dispatch],
    );

    // when ask to post comment, DISPATCH and RELOAD
    const onWriteComment = ((commentId) => {
        // if originalCommentId is not null
        if (originalCommentId) {
            console.log(originalCommentId);
            console.log(body);

            dispatch(updateComment({postId, commentId, body}));
            // setEditVal(0);
            window.location.reload();
            return;
        }
        // console.log(postId);
        // console.log(body);
        dispatch(writeComments(postId, body));
        window.location.reload();
    });

    // when edit button is clicked
    const onEdit = ((comment, commentId) => {
        // setState is asynchronous, so may not be updated if console.log called after
        // setEditVal(1);
        console.log("onEdit now executing...");
        // // change clickedEdit value stored in MongoDB
        // dispatch(onEditClick({postId, commentId}));
        
        // NOTE: changed from setState to redux modules/actions
        dispatch(setOriginalComment(comment));
        
    });
    
    // gives a warning
    const onToggleAskRemove = useCallback((commentId) => {
        dispatch(toggleAskRemove(commentId));
    }, [dispatch]);

    // cancel removing a comment
    const onCancelRemoveComment = (() => {
        dispatch(cancelRemoveComment());
        // setEditVal(0);
    }, [dispatch]);

    // when users confirm that they want to remove, DISPATCH and RELOAD
    const onConfirmRemove= useCallback(() => {
        dispatch(removeComment(postId, commentId));
        window.location.reload();
    }, [dispatch, postId, commentId]);

    return (
        <>
    <CommentsViewer 
    onChangeCommentInput={onChangeCommentInput}
    onWriteComment={onWriteComment}
    body={body}
    user={user}
    comments={comments}
    loading={loading}
    onToggleAskRemove={onToggleAskRemove}
    onEdit={onEdit}
    />
    <AskModal
    title="Delete Comment"
    description="Your comment will PERMANENTLY be deleted. Confirm to proceed."
    confirmText="Delete Comment"
    cancelText="Cancel"
    onConfirm={onConfirmRemove}
    onCancel={onCancelRemoveComment}
    visible={askRemove}/>
    </>
    );
};

export default CommentsViewerContainer;