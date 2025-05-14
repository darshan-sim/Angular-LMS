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
          this.posts.set([...this.posts(), post])
          this.router.navigate(['/user', 'post', 'view'], {
            queryParams: { id: post.id },
          });
        },
        error: (error) => console.log(error),
      });
  }

  loadPosts() {
    this.baseAPIService.get<PostDTO[]>(PostApi.Posts).subscribe({
      next: (list) => {
        this.posts.set(list);
      },
      error: (error) => console.log(error),
    });
  }

  getPostByUser(userId: string) {
    this.baseAPIService.get<PostDTO[]>(PostApi.PostByUserId(userId)).subscribe({
      next: (list) => {
        this.posts.set(list);
      },
      error: (error) => console.log(error),
    });
  }

  deletePost(postId: string) {
    this.baseAPIService.delete<boolean>(PostApi.PostById(postId)).subscribe({
      next: () => {
        this.posts.set(this.posts().filter((p) => p.id !== postId));
        this.router.navigate(['/user/post']);
      },
      error: (error) => console.log(error),
    });
  }

  updatePost(postId: string, updatedPost: PostDTO) {
    this.baseAPIService
      .put<PostDTO, PostDTO>(PostApi.PostById(postId), updatedPost)
      .subscribe({
        next: (updated) => {
          this.posts.set(
            this.posts().map((p) => (p.id !== postId ? p : updated))
          );
          this.router.navigate(['/user', 'post', 'view'], {
            queryParams: { id: postId },
          });
        },
        error: (error) => console.log(error),
      });
  }

  getPostById(postId: string, forceRefresh = false): PostDTO | null {

    // Normal case: return post from current state
    const post = this.allPosts().find((p) => p.id === postId);
    if (!post) {
      this.router.navigate(['/home']);
      return null;
    }
    return post;
  }
}
