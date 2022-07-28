import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
      const tag = searchParams.get('tag');
      const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(listPosts({ username, page, tag }));
  }, [dispatch, username, searchParams]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;