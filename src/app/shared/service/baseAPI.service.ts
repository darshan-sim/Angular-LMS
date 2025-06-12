import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class BaseAPIService {
  constructor(protected http: HttpClient) {}

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(environment.apiBase + url, { params })
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error(error.error || error.message || 'Server Error')
          )
        )
      );
  }

  post<T, U = T>(url: string, body: U): Observable<T> {
    return this.http
      .post<T>(environment.apiBase + url, body)
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error(error.error || error.message || 'Server Error')
          )
        )
      );
  }

  put<T, U = T>(url: string, body: U): Observable<T> {
    return this.http
      .put<T>(environment.apiBase + url, body)
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error(error.error || error.message || 'Server Error')
          )
        )
      );
  }

  patch<T, U = T>(url: string, body: U): Observable<T> {
    return this.http
      .patch<T>(environment.apiBase + url, body)
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error(error.error || error.message || 'Server Error')
          )
        )
      );
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(environment.apiBase + url)
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error(error.error || error.message || 'Server Error')
          )
        )
      );
  }
}
