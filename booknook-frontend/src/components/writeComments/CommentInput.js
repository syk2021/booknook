import styled from 'styled-components';

const StyledCommentInput = styled.input`
    width: 97%;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 1rem;
    border: 1px solid gray;
    border-radius: 4px;
    color: gray;
    display: block;
`;

const CommentInput = ({ onChangeCommentInput, commentInput }) => {
    const onChange = (e) => {
        onChangeCommentInput(e.target.value);
    };
    return (
        <>
        <hr/>
        <StyledCommentInput
        value={commentInput}
        onChange={onChange}
        placeholder="Comment..."
        rows={2}
        maxRows={20}/>
        </>
    );
};

export default CommentInput;