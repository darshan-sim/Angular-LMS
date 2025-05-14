export const PostApi = {
  Posts: '/posts',
  PostById: (id: string) => `/posts/${id}`,
  PostByUserId: (userId: string) => `/posts?userId=${userId}`,
};

export const UserApi = {
  Users: '/users',
};

export const CommentApi = {
  Comment: '/comments',
  CommentsByPostId: (id: string) => `/comments?postId=${id}`,
  DeleteComment: (id: string) => `/comments/${id}`,
};
