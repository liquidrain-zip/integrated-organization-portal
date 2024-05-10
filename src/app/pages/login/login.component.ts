import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showSignUp: boolean = true;

  signUpUser: SignUpModel = new SignUpModel();
  loginUser: LoginModel = new LoginModel();

  constructor(private router: Router) {}

  onRegister() {
    debugger;
    const localUser = localStorage.getItem('userInfo');
    if (localUser != null) {
      const users = JSON.parse(localUser);
      users.push(this.signUpUser);
      localStorage.setItem('userInfo', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.signUpUser);
      localStorage.setItem('userInfo', JSON.stringify(users));
    }
    alert('Registration Success');
  }

  onLogin() {
    debugger;
    const localUsers = localStorage.getItem('userInfo');
    if (localUsers != null) {
      const users = JSON.parse(localUsers);

      const isUserPresent = users.find(
        (user: SignUpModel) =>
          user.email == this.loginUser.email &&
          user.password == this.loginUser.password
      );
      if (isUserPresent != undefined) {
        alert('User Found...');
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('No User Found');
      }
    }
  }
}

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
