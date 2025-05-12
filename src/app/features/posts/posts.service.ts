import { inject, Injectable } from '@angular/core';
import { BaseAPIService } from '../../shared/service/baseAPI.service';
import { catchError, Observable, throwError } from 'rxjs';
import { PostDTO } from '../../shared/models/post';
import { PostApi } from '../../shared/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}
  baseAPIService = inject(BaseAPIService);

  getAllPosts(): Observable<PostDTO[]> {
    return this.baseAPIService.get<PostDTO[]>(PostApi.Posts).pipe(
      catchError((error) => {
        return throwError(() => {
          console.log(error);
          new Error(error.error || error.message || 'Error');
        });
      })
    );
  }
// Http failure during parsing for http://localhost:4200/posts"

  getPostById(id: number): Observable<PostDTO> {
    return this.baseAPIService.get<PostDTO>(PostApi.PostById(id)).pipe(
      catchError((error) => {
        return throwError(
          () => new Error(error.error || error.message || 'Error')
        );
      })
    );
  }

  getPostsComments(id: number): Observable<PostDTO> {
    return this.baseAPIService.get<PostDTO>(PostApi.CommentsByPostId(id)).pipe(
      catchError((error) => {
        return throwError(
          () => new Error(error.error || error.message || 'Error')
        );
      })
    );
  }
}
