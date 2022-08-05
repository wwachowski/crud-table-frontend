import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { ApiPaths } from 'src/app/data/models/api-paths';
import { environment } from 'src/environments/environment';
import { UnparsedUser, User } from '../data/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiKey: string = environment.apiUrl;

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router) { }

  public register(data: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiKey + ApiPaths.Create}`, data);
  }

  public login(data: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiKey + ApiPaths.Login}`, data);
  }

  public getAllUsers(): Observable<UnparsedUser[]> {
    return this.http.get<UnparsedUser[]>(`${this.apiKey + ApiPaths.Users}`);
  }

  public patchUsersStatus(status: 'active' | 'blocked', users: User[]): Observable<any> {
    return this.http.patch<any>(`${this.apiKey + ApiPaths.Users}`, {
      ids: Array.from(users, user => user.id),
      status: status
    });
  }

  public deleteUsers(users: User[]): Observable<any> {
    console.log()
    return this.http.delete<any>(`${this.apiKey + ApiPaths.Users}`, {
      body: {
        ids: Array.from(users, user => user.id)
      },
    });
  }

  public deleteTokensWithLocalStorage(): void {
    if (this.cookies.check('accessToken')&&this.cookies.check('refreshToken')) {
      this.cookies.delete('accessToken');
      this.cookies.delete('refreshToken');
      localStorage.clear();
    }
  }
}