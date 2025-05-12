export interface CommentsDTO {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  userId: number;
}

export interface CommentsCreateDTO {
  postId: number;
  name: string;
  email: string;
  body: string;
  userId: number;
}
