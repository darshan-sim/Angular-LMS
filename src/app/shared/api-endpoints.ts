export const PostApi = {
  Posts: '/posts',
  PostById: (id: string) => `/posts/${id}`,
  PostByUserId: (userId: string) => `/posts?userId=${userId}`,
  CommentsByPostId: (id: string) => `/posts/${id}/comments`,
};

export const UserApi = {
  Users: '/users'
}

export const CommentApi = {
  Comment: '/comments',

}
