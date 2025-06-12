import { inject, Injectable } from '@angular/core';
import { BaseAPIService } from '../../shared/service/baseAPI.service';
import { UserDTO } from '../../shared/models/user';
import { UserApi } from '../../shared/api-endpoints';
import { map, Observable, of, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  baseAPIService = inject(BaseAPIService)

  getUsers(){
    return this.baseAPIService.get<UserDTO[]>(UserApi.Users)
  }

  login({email, password}: {email: string, password: string}): Observable<UserDTO | null>{
    if(password !== "simform123"){
      return of(null)
    }
    return this.baseAPIService.get<UserDTO[]>(UserApi.UserByEmail(email)).pipe(
      map((res) => res[0] ?? null),
    )
  }
}
