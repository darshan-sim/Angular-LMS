export interface CommentDTO {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
  userId: string;
}

export interface CommentCreateDTO {
  postId: string;
  name: string;
  email: string;
  body: string;
  userId: string;
}
