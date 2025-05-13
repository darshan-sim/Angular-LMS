import { inject, Injectable } from '@angular/core';
import { BaseAPIService } from '../../shared/service/baseAPI.service';
import { UserDTO } from '../../shared/models/user';
import { UserApi } from '../../shared/api-endpoints';
import { AuthService } from '../../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  baseAPIService = inject(BaseAPIService)
  authService = inject(AuthService)

  getUsers(){
    return this.baseAPIService.get<UserDTO[]>(UserApi.Users)
  }

  login(user: UserDTO){
    this.authService.login(user)
  }
}
