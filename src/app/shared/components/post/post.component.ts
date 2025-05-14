import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PostDTO } from '../../models/post';
import { AuthService } from '../../../core/auth.service';
import { UserDTO } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { CommentCreateDTO } from '../../models/comments';
import { CommentsComponent } from '../comments/comments.component';
import { PostService } from '../../service/post-comments.service';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../service/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [FormsModule, CommentInputComponent, CommentsComponent, RouterLink],
  providers: [PostService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  post = input.required<PostDTO>();
  authService = inject(AuthService);
  showComments: boolean = false;

  postsService = inject(PostsService);
  router = inject(Router);

  user = signal<UserDTO | null>(null);
  comment = '';

  commentStat = inject(PostService);

  ngOnInit(): void {
    this.user.set(this.authService.user());
  }

  onCommentToggle() {
    this.showComments = !this.showComments;
    if (this.showComments) {
      this.commentStat.setDeleteCommentsOnPost(this.post().userId);
      console.log('postUserId', this.post().userId);
      this.commentStat.loadComments(this.post().id);
    }
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
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
    this.commentStat.addComments(comment);
  }
}
