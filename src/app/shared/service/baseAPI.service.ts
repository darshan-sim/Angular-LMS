import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class BaseAPIService {
  constructor(protected http: HttpClient) {}

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>( environment.apiBase + url, { params });
  }

  post<T, U = T>(url: string, body: U): Observable<T> {
    return this.http.post<T>(environment.apiBase + url, body);
  }

  put<T, U = T>(url: string, body: U): Observable<T> {
    return this.http.put<T>(environment.apiBase + url, body);
  }

  patch<T, U = T>(url: string, body: U): Observable<T> {
    return this.http.patch<T>(environment.apiBase + url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(environment.apiBase + url);
  }
}
