import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PostDTO } from '../../models/post';
import { AuthService } from '../../../core/auth.service';
import { UserDTO } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { CommentService } from '../../service/comment.service';
import { CommentCreateDTO } from '../../models/comments';

@Component({
  selector: 'app-post',
  imports: [FormsModule, CommentInputComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  post = input.required<PostDTO>();
  authService = inject(AuthService);
  commentService = inject(CommentService);
  showComments:boolean = false

  user = signal<UserDTO | null>(null);
  comment = '';

  ngOnInit(): void {
    this.user.set(this.authService.user());
  }

  onComment(commentBody: string) {
    const u = this.user();
    if (!u) {
      return;
    }
    const comment: CommentCreateDTO = {
      body: commentBody,
      userId: u.id,
      email: u.email,
      name: u.name,
      postId: this.post().id,
    };
    this.commentService.createComment(comment).subscribe({
      next : comment => console.log(comment)
    });
  }
}
