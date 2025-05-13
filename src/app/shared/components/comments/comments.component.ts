import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommentCreateDTO, CommentDTO } from '../../models/comments';
import { CommentService } from '../../service/comment.service';
import { CommentComponent } from './comment/comment.component';
import { Observable } from 'rxjs';
import { PostService } from '../../service/post-comments.service';

@Component({
  selector: 'app-comments',
  imports: [CommentComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  postCommentService = inject(PostService);
  comments = this.postCommentService.comments$;
}
