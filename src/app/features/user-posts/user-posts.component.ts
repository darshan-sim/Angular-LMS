import { Component, inject, OnInit, signal } from '@angular/core';
import { PostDTO } from '../../shared/models/post';
import { UserPostService } from './user-post.service';
import { PostComponent } from "../../shared/components/post/post.component";
import { PostService } from '../../shared/service/post-comments.service';
import { PostsService } from '../../shared/service/posts.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-posts',
  imports: [PostComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit{

  
  postsService = inject(PostsService)
  usersPost = this.postsService.allPosts
  authService = inject(AuthService)
  
  ngOnInit(): void {
    const user = this.authService.user();
    if(user){
      this.postsService.getPostByUser(user.id)
    }
  }
}
