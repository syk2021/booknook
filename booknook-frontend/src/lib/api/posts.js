import client from './client';

export const writePost = ({ title, body, tags }) => 
client.post('/api/posts', { title, body, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ username, page, tag }) => {
    return client.get(`/api/posts`, {
        params: { username, page, tag },
    });
};

export const updatePost = ({ id, title, body, tags }) => 
client.patch(`/api/posts/${id}`, { title, body, tags });

export const removePost = id => client.delete(`/api/posts/${id}`);
