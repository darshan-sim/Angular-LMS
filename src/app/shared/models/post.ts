export interface PostDTO {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface PostCreateDTO {
  userId: string;
  title: string;
  body: string;
}
