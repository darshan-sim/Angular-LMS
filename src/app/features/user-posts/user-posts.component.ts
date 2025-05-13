import { Component, inject, OnInit, signal } from '@angular/core';
import { PostDTO } from '../../shared/models/post';
import { UserPostService } from './user-post.service';
import { PostComponent } from "../../shared/components/post/post.component";

@Component({
  selector: 'app-user-posts',
  imports: [PostComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit{

  usersPost = signal<PostDTO[]>([])
  
  userPostService = inject(UserPostService)
  
  ngOnInit(): void {
    this.userPostService.getPostByUser().subscribe({
      next: (posts) => this.usersPost.set(posts)
    })
  }

}
