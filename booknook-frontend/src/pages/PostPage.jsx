import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentsViewerContainer from '../containers/writeComments/CommentsViewerContainer';
import { Helmet } from 'react-helmet-async';

const PostPage = () => {
    return (
        <>
            <Helmet>
                <title>Postview - BOOKNOOK</title>
            </Helmet>
            <PostViewerContainer/>
            <CommentsViewerContainer/>
        </>
    );
};

export default PostPage;