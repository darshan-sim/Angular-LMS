import { inject, Injectable, signal } from '@angular/core';
import { BaseAPIService } from './baseAPI.service';
import { PostCreateDTO, PostDTO } from '../models/post';
import { PostApi } from '../api-endpoints';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  posts = signal<PostDTO[]>([]);
  readonly allPosts = this.posts.asReadonly();

  baseAPIService = inject(BaseAPIService);

  router = inject(Router);

  createPost(post: PostCreateDTO) {
    this.baseAPIService
      .post<PostDTO, PostCreateDTO>(PostApi.Posts, post)
      .subscribe({
        next: (post) => {
          console.log(post);
          this.router.navigate(['/user', 'post']);
        },
        error: (error) => console.log(error),
      });
  }

  loadPosts() {
    this.baseAPIService.get<PostDTO[]>(PostApi.Posts).subscribe({
      next: (list) => {
        this.posts.set(list);
        console.log(list);
      },
      error: (error) => console.log(error),
    });
  }

  deletePost(postId: number) {
    this.baseAPIService.delete<boolean>(PostApi.PostById(postId)).subscribe({
      next: () => {
        this.posts.set(this.posts().filter((p) => p.id !== postId));
      },
      error: (error) => console.log(error),
    });
  }

  updatePost(postId: number, updatedPost: PostDTO) {
    this.baseAPIService
      .put<PostDTO, PostDTO>(PostApi.PostById(postId), updatedPost)
      .subscribe({
        next: (updated) => {
          this.posts.set(
            this.posts().map((p) => (p.id !== postId ? p : updated))
          );
        },
        error: (error) => console.log(error),
      });
  }
}
