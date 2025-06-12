export const PostApi = {
  Posts: '/posts',
  PostById: (id: string) => `/posts/${id}`,
  PostByUserId: (userId: string) => `/posts?userId=${userId}`,
};

export const UserApi = {
  Users: '/users',
  UserByEmail: (email: string) => `/users?email=${email}`
};

export const CommentApi = {
  Comment: '/comments',
  CommentsByPostId: (id: string) => `/comments?postId=${id}`,
  DeleteComment: (id: string) => `/comments/${id}`,
  UpdateComment: (id: string) => `/comments/${id}`,
};
