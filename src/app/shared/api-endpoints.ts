export const PostApi = {
  Posts: '/posts',
  PostById: (id: number) => `/posts/${id}`,
  CommentsByPostId: (id: number) => `/posts/${id}/comments`,
};
