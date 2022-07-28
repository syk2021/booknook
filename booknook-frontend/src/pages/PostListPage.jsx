// list
import React from 'react';
// import PostList from '../components/posts/PostList';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
import { Helmet } from 'react-helmet-async';

const PostListPage = () => {
    return (
        <div>
            <Helmet>
                <title>Postlist - BOOKNOOK</title>
            </Helmet>
           <PostListContainer/>
           <PaginationContainer/>
        </div>
    );
};

export default PostListPage;