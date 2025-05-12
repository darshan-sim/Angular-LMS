import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { PostsService } from './posts.service';
import { PostDTO } from '../../shared/models/post';
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-posts',
  imports: [PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  postService = inject(PostsService);

  posts = signal<PostDTO[]>([]);

  constructor() {
    effect(() => {
      console.log(this.posts);
    });
  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {console.log(posts); this.posts.set(posts)},
    });
  }
}
