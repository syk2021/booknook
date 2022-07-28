import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { post, error, loading, user } = useSelector(( { post, loading, user }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user,
    }));

    useEffect(() => {
        dispatch(readPost(postId));
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    // executes when edit button for post is clicked
    const onEdit = () => {
        dispatch(setOriginalPost(post));
        navigate('/write');
    }

    const onRemove = async () => {
        try {
            await removePost(postId);
            navigate('/'); // on delete, redirect to home
        } catch (e) {
            console.log(e);
        }
    };

    // ownPost checks if this user is the author of the post
    const ownPost = (user && user._id) === (post && post.user._id);

    return <PostViewer post={post} loading={loading} error={error} 
    actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}/>;
};

export default PostViewerContainer;