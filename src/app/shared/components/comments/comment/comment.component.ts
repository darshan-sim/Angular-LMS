import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommentDTO } from '../../../models/comments';
import { AuthService } from '../../../../core/auth.service';
import { CommentService } from '../../../service/comment.service';
import { PostService } from '../../../service/post-comments.service';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  comment = input.required<CommentDTO>();

  authService = inject(AuthService);
  postCommentService = inject(PostService);

  userId = signal<number | undefined>(undefined);

  ngOnInit(): void {
    const uId = this.authService.user()?.id;
    if (uId) {
      this.userId.set(uId);
    }
    // console.log(this.userId())
    console.log(this.comment().userId);
  }

  onCommentDelete(id: number) {
    this.postCommentService.removeComment(id);
  }

  get canDelete(): boolean {
    return (
      this.userId()?.toString() === this.comment().userId.toString() ||
      this.postCommentService.canDeleteCommentsOnPost()
    );
  }
}
