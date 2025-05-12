export interface PostDTO {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostCreateDTO {
  userId: number;
  title: string;
  body: string;
}
