import styled from 'styled-components';
import Responsive from '../common/Responsive';
import CommentInput from './CommentInput';
import Button from '../common/Button';
import CommentsList from './CommentsList';
import CommentButtonBlock from './CommentButtonBlock';

const CommentsViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const CommentsViewer = ({ onEdit, onChangeCommentInput, onWriteComment, body, user, comments, loading, onToggleAskRemove, commentClickedEdit }) => {
    return (
        <CommentsViewerBlock>
            <CommentInput onChangeCommentInput={onChangeCommentInput} value={body}/>
            <CommentButtonBlock>
                <Button onClick={onWriteComment}>Post Comment</Button>
            </CommentButtonBlock>
            <CommentsList body={body} 
            onChangeCommentInput={onChangeCommentInput} 
            user={user} 
            comments={comments} 
            loading={loading} 
            onToggleAskRemove={onToggleAskRemove}
            onWriteComment={onWriteComment}
            // editVal={editVal}
            onEdit={onEdit}
            commentClickedEdit={commentClickedEdit}
            />
        </CommentsViewerBlock>
    );
};

export default CommentsViewer;