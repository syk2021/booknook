import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import CommentInput from './CommentInput';
import CommentButtonBlock from './CommentButtonBlock';
import Button from '../common/Button';

const CommentsListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const CommentItemBlock = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    &: first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }
    p {
        margin-top: 1rem;
    }
`;

const CommentActionButtonsBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    margin-top: -1.5rem;
`;

const ActionButton = styled.span`
    color: ${palette.gray[6]};
    border: none;
    outline: none;
    font-size: 0.875rem;
    cursor: pointer;
    &:hover {
    text-decoration:underline;
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
    }
    & + & {
    margin-left: 0.25rem;
    }
`;

// when edit is clicked, input box for THAT COMMENT ONLY is displayed
const onEditClick = ((comment, onEdit) => {
    comment.clickedEdit = true;
    onEdit(comment, comment.id);
});

const CommentsList = ({ onChangeCommentInput, body, loading, user, comments, onToggleAskRemove, onEdit, onWriteComment }) => {
    console.log(comments);
    return (
        <CommentsListBlock>
            <div>
                {!loading && comments && (
                    <div>
                        {comments.map(comment => {
                            console.log("comment.clickedEdit");
                            console.log(comment.clickedEdit);
                            return comment.clickedEdit ?
                            <>
                            <CommentInput onChangeCommentInput={onChangeCommentInput} value={body}/>
                            <CommentButtonBlock>
                                <Button onClick={() => onWriteComment(comment._id)}>Update Comment</Button>
                            </CommentButtonBlock>
                            </>
                            :
                            <CommentItemBlock>
                                <SubInfo
                                username={comment.authorId.username}
                                publishedDate={comment.createdAt}/>
                                {user && user._id === comment.authorId._id && (
                                <>
                                <CommentActionButtonsBlock>
                                    <ActionButton onClick={() => onEditClick(comment, onEdit)}>Edit</ActionButton>
                                    <ActionButton onClick={() => onToggleAskRemove(comment._id)}>Delete</ActionButton>
                                </CommentActionButtonsBlock>
                                </>
                                )}
                                <p>{comment.body}</p> 
                            </CommentItemBlock>
                        })}
                    </div>  
                )}
            </div>
        </CommentsListBlock>
    );
};

export default CommentsList;