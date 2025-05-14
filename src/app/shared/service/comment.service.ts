import { inject, Injectable } from '@angular/core';
import { CommentCreateDTO, CommentDTO } from '../models/comments';
import { BaseAPIService } from './baseAPI.service';
import { CommentApi } from '../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseAPIService = inject(BaseAPIService);

  constructor() {}

  createComment(comment: CommentCreateDTO) {
    return this.baseAPIService.post<CommentDTO, CommentCreateDTO>(
      CommentApi.Comment,
      comment
    );
  }

  getCommentByPostId(postId: string) {
    return this.baseAPIService.get<CommentDTO[]>(
      CommentApi.CommentsByPostId(postId)
    );
  }

  deleteComment(id: string) {
    return this.baseAPIService.delete<boolean>(CommentApi.DeleteComment(id));
  }
}
