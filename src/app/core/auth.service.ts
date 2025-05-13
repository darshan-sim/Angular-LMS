import { inject, Injectable, signal } from "@angular/core";
import { UserDTO } from "../shared/models/user";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthService{

  router = inject(Router)
  
  private userSignal = signal<UserDTO | null>(this.getUserFromLocalStorage())

  login(user: UserDTO){
    localStorage.setItem('user', JSON.stringify(user))
    this.userSignal.set(user)
    this.router.navigate(['/home'])
  }

  get user(){
    return this.userSignal.asReadonly()
  }

  isLoggedIn(): boolean{
    return this.userSignal() !== null
  }
  
  getUserFromLocalStorage(): UserDTO | null {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  }
}