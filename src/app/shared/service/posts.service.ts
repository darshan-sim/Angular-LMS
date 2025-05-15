import { inject, Injectable, signal } from '@angular/core';
import { BaseAPIService } from './baseAPI.service';
import { PostCreateDTO, PostDTO } from '../models/post';
import { PostApi } from '../api-endpoints';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { PaginatedResponse } from '../models/paginated-response';

@Injectable({ providedIn: 'root' })
export class PostsService {
  posts = signal<PostDTO[]>([]);
  readonly allPosts = this.posts.asReadonly();

  private currentPage = signal(0);
  private totalPages = signal(1);
  private isLoading = signal(false);

  router = inject(Router);
  baseAPIService = inject(BaseAPIService);

  reset() {
    this.posts.set([]);
    this.currentPage.set(0);
    this.totalPages.set(1);
  }

  hasMore() {
    return this.currentPage() < this.totalPages();
  }

  createPost(post: PostCreateDTO) {
    this.baseAPIService
      .post<PostDTO, PostCreateDTO>(PostApi.Posts, post)
      .subscribe({
        next: (post) => {
          this.posts.set([...this.posts(), post]);
          this.router.navigate(['/user', 'post', 'view'], {
            queryParams: { id: post.id },
          });
        },
        error: (error) => console.log(error),
      });
  }

  loadNextPage() {
    if(this.isLoading() || !this.hasMore()) return
    const nextPage = this.currentPage() + 1
    this.isLoading.set(true)

    this.baseAPIService.get<PaginatedResponse<PostDTO>>(`${PostApi.Posts}?_page=${nextPage}`).subscribe({
      next: (res) => {
        this.posts.update(current => [...current, ...res.data]);
        console.log(this.allPosts())
        this.currentPage.set(nextPage)
        this.totalPages.set(res.pages)
        this.isLoading.set(false)
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

  getPostById(postId: string): Observable<PostDTO | undefined> {
    const post = this.allPosts().find((p) => p.id === postId);

    if (post) {
      return of(post);
    }

    return this.baseAPIService.get<PostDTO>(PostApi.PostById(postId)).pipe(
      catchError((err) => {
        console.error('Post not found or error', err);
        return of(undefined);
      })
    );
  }
}
