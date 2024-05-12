import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Test cases for login functionality
  it('should call AuthService.login on successful login', () => {
    const mockLoginUser = {
      email: 'test@example.com',
      password: 'password123',
    };
    component.loginUser = mockLoginUser;
    fixture.detectChanges();

    spyOn(authService, 'login').and.returnValue(of({ token: 'abc123' })); // Mock successful login response

    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith(mockLoginUser);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle login errors', () => {
    const mockLoginUser = {
      email: 'test@example.com',
      password: 'password123',
    };
    component.loginUser = mockLoginUser;
    fixture.detectChanges();

    spyOn(authService, 'login').and.returnValue(of(new Error('Login failed')));

    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith(mockLoginUser);
  });
});
