import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = '/api/login';
  private isAuthenticated = false;
  private authSecretKey = 'token';

  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    localStorage.removeItem('loggedUser');
    this.isAuthenticated = false;
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, user).pipe(
      catchError((error) => {
        // mock login
        this.mockLogin(user);
        console.error(error);
        throw error;
      })
    );
  }

  mockLogin(user: any) {
    this.isAuthenticated = true;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    localStorage.setItem('token', Math.random().toString(36));
  }
}
