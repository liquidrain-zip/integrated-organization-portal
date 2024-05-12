import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  loggedUser: any;

  constructor(private router: Router, private authService: AuthService) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
  }

  onLogoff() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  navigateTo(link: string) {
    this.router.navigateByUrl('/' + link);
  }
}
