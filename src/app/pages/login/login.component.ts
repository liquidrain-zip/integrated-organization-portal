import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, catchError, map, of, tap } from 'rxjs';

export class SignUpModel {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.name = '';
    this.password = '';
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showSignUp: boolean = true;

  signUpUser: SignUpModel = new SignUpModel();
  loginUser: LoginModel = new LoginModel();
  disableSignUp: boolean = true;
  disableLogin: boolean = true;
  loginSubscription: Subscription | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  updateSignUpUser(value: string, key: string) {
    this.signUpUser = {
      ...this.signUpUser,
      [key]: value,
    };
    // control btn disable
    this.disableSignUp = this.hasNullOrEmptyValues(this.signUpUser);
  }

  updateLoginUser(value: string, key: string) {
    this.loginUser = {
      ...this.loginUser,
      [key]: value,
    };
    // control btn disable
    this.disableLogin = this.hasNullOrEmptyValues(this.loginUser);
  }

  hasNullOrEmptyValues(obj: any) {
    //validate sign up / login user
    if (typeof obj !== 'object' || obj === null) return false;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (
          (typeof value === 'string' && value.trim() === '') ||
          value === null
        ) {
          return true;
        } else if (typeof value === 'object') {
          // Recursively check
          if (this.hasNullOrEmptyValues(value)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  onRegister() {
    // mock registration
    // adds new sign up user to list of registered users to local storage
    const localUser = localStorage.getItem('usersInfo');
    if (localUser != null) {
      const users = JSON.parse(localUser);
      users.push(this.signUpUser);
      localStorage.setItem('usersInfo', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.signUpUser);
      localStorage.setItem('usersInfo', JSON.stringify(users));
    }
    this.showSignUp = false; // show login
  }

  mockLogin() {
    const localUsers = localStorage.getItem('usersInfo');
    if (localUsers != null) {
      const users = JSON.parse(localUsers);
      const isUserPresent = users.find(
        (user: SignUpModel) =>
          user.email == this.loginUser.email &&
          user.password == this.loginUser.password
      );
      if (isUserPresent != undefined) {
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/dashboard');
      }
    }
  }

  onLogin() {
    const loginUrl = '/api/login';
    this.loginSubscription = this.http
      .post(loginUrl, this.loginUser)
      .pipe(
        map((response) => {
          // Handle successful login response (e.g., extract token)
          return response;
        }),
        tap(() => {
          // Handle successful login (e.g., navigate, store token)
          localStorage.setItem('loggedUser', JSON.stringify(this.loginUser));
          this.router.navigateByUrl('/dashboard');
        }),
        catchError((error) => {
          console.error('Login error:', error);
          this.mockLogin(); // simulate a mock login success
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
