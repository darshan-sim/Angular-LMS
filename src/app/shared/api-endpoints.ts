export const PostApi = {
  Posts: '/posts',
  PostById: (id: number) => `/posts/${id}`,
  PostByUserId: (userId: number) => `/posts?userId=${userId}`,
};

export const UserApi = {
  Users: '/users',
};

export const CommentApi = {
  Comment: '/comments',
  CommentsByPostId: (id: number) => `/comments?postId=${id}`,
  DeleteComment: (id: number) => `/comments/${id}`,
};
