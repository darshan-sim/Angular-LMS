import { inject, Injectable } from '@angular/core';
import { BaseAPIService } from '../../shared/service/baseAPI.service';
import { AuthService } from '../../core/auth.service';
import { PostDTO } from '../../shared/models/post';
import { PostApi } from '../../shared/api-endpoints';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {

  constructor() { }

  authService = inject(AuthService)
  baseAPIService = inject(BaseAPIService)
  
  getPostByUser(){
    const user = this.authService.user();
    if(!user){
      return of([])
    }
    return this.baseAPIService.get<PostDTO[]>(PostApi.PostByUserId(user.id));
  }  
}
