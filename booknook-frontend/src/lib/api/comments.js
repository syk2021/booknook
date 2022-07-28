import client from './client';

export const writeComment = ({ postId, body }) =>
client.post(`/api/posts/${postId}/comments`, { postId, body });

export const listComments = (postId) => client.get(`/api/posts/${postId}/comments`);

export const removeComment = ({ postId, commentId }) =>
client.delete(`/api/posts/${postId}/comments/${commentId}`);

export const updateComment = ({ postId, commentId, body }) => 
client.patch(`/api/posts/${postId}/comments/${commentId}`, { body });