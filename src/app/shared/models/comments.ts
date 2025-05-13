export interface CommentDTO {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  userId: number;
}

export interface CommentCreateDTO {
  postId: number;
  name: string;
  email: string;
  body: string;
  userId: number;
}
