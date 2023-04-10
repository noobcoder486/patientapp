import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private readonly router: Router
  ) { }

  private readonly tokenKey = 'auth_token';


  getLoginDetails(data:any)
{
  return this.httpClient.get('http://localhost:3000/users').pipe(map((users: any) =>{
    for(let item of users)
    {
      if(data.Username == item.UserName && data.Password == item.Password)
      {
        localStorage.setItem(this.tokenKey, item.token)
        return item;
      }
      
    }
    return;
  }))
}

getToken(): string | null {
  return localStorage.getItem(this.tokenKey);
}

isAuthenticated(): boolean {
  return !!this.getToken();
}

logout(): void {
  localStorage.removeItem(this.tokenKey);
  this.router.navigateByUrl('/login');
}
}
