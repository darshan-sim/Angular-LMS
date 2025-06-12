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
// import { CommentInputComponent } from '../../comment-input/comment-input.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  imports: [FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  comment = input.required<CommentDTO>();

  authService = inject(AuthService);
  postCommentService = inject(PostService);

  ownPostDelete = this.postCommentService.canDeleteCommentsOnPost.asReadonly();
  isEditing = false;
  userId = signal<string | undefined>(undefined);
  text = '';

  ngOnInit(): void {
    const uId = this.authService.user()?.id;
    if (uId) {
      this.userId.set("1");
    }
  }

  emit() {
    const trimmed = this.text.trim();
    if (trimmed) {
      const updatedComment: CommentDTO = {
        ...this.comment(),
        body: trimmed
      }
      this.postCommentService.updateComment(this.comment().id, updatedComment);
      this.text = '';
      this.isEditing = false
    }
  }

  onCommentEditMode() {
    this.text = this.comment().body
    this.isEditing = !this.isEditing;
  }

  onCommentDelete(id: string) {
    this.postCommentService.removeComment(id);
  }
}
