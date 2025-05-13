import { inject, Injectable } from '@angular/core';
import { BaseAPIService } from '../../shared/service/baseAPI.service';
import { PostDTO } from '../../shared/models/post';
import { PostApi } from '../../shared/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}
  baseAPIService = inject(BaseAPIService);

  getAllPost() {
    return this.baseAPIService.get<PostDTO[]>(PostApi.Posts);
  }
}
