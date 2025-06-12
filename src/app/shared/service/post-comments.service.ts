import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentCreateDTO, CommentDTO } from '../models/comments';
import { CommentService } from './comment.service';
import { AuthService } from '../../core/auth.service';

@Injectable()
export class PostService {
  private comments$$ = signal<CommentDTO[]>([]);
  readonly comments$ = this.comments$$.asReadonly();

  canDeleteCommentsOnPost = signal<boolean>(true);

  authService = inject(AuthService);

  commentService = inject(CommentService);

  loadComments(postId: string): void {
    this.commentService.getCommentByPostId(postId).subscribe({
      next: (list) => {
        this.comments$$.set(list);
      },
      error: (error) => console.log(error),
    });
  }

  addComments(comment: CommentCreateDTO): void {
    this.commentService.createComment(comment).subscribe({
      next: (newComment) => {
        this.comments$$.set([...this.comments$$(), newComment]);
      },
      error: (err) => console.error('add comment', err),
    });
  }

  updateComment(commentId: string, comment: CommentDTO): void {
    this.commentService.updateComment(commentId, comment).subscribe({
      next: (newComment) => {
        this.comments$$.set(
          this.comments$$().map((c) => (c.id !== commentId ? c : newComment))
        );
      },
      error: (err) => console.error('add comment', err),
    });
  }

  removeComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments$$.set(
          this.comments$$().filter((c) => c.id !== commentId)
        );
      },
      error: (err) => console.error('delete comment', err),
    });
  }

  setDeleteCommentsOnPost(userId: string) {
    const uId = this.authService.user()?.id;
    if (uId === userId.toString()) {
      this.canDeleteCommentsOnPost.set(true);
    } else {
      this.canDeleteCommentsOnPost.set(false);
    }
  }
}
