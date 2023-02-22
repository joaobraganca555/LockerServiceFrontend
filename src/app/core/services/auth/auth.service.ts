import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/models/registerUser.model';
import { RegisterUserAdmin } from 'src/app/models/registerUserAdmin.model';
import { User } from 'src/app/models/user.model';
import { UserUpdate } from 'src/app/models/userUpdate.model';
import { environment } from 'src/environments/environment.development';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  login(emailOrUsername: string, password: string): Observable<any> {
    return this.http.post(
      `${environment.gatewayBaseUrl}/auth/login`,
      emailOrUsername.includes('@')
        ? {
            email: emailOrUsername,
            password: password
          }
        : {
            username: emailOrUsername,
            password: password
          }
    );
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post(
      `${environment.gatewayBaseUrl}/user/register`,
      registerUser
    );
  }

  registerUserAdmin(registerUseradmin: RegisterUserAdmin): Observable<any> {
    return this.http.post(
      `${environment.gatewayBaseUrl}/user/create`,
      registerUseradmin
    );
  }

  updateUser(registerUseradmin: UserUpdate): Observable<any> {
    return this.http.put(
      `${environment.gatewayBaseUrl}/user/edit`,
      registerUseradmin
    );
  }

  logout() {
    this.user = new User();
    this.router.navigate(['']);
  }

  isExpired(): boolean {
    const expirationTime = new Date(this.user.exp);
    const isExpired = expirationTime.getTime() > new Date().getTime();
    if (isExpired) {
      this.alertService.showInfoAlert(
        'Session expired',
        'Your session has expired, please login again.'
      );
      this.router.navigate(['']);
    }
    return isExpired;
  }

  isLoggedIn(): boolean {
    // Check if the user has a valid JWT token in local storage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    if (Object.keys(this.user).length === 0) {
      return false;
    } else {
      if (
        this.user.token === '' ||
        this.user.token === null ||
        this.user.token === undefined
      ) {
        return false;
      }
      if (this.isExpired()) {
        return false;
      }
      return true;
    }
  }

  isAdmin(): boolean {
    return this.user.role === 'ADMIN';
  }

  isEmployee(): boolean {
    return this.user.role === 'EMPLOYEE';
  }

  isTransporter(): boolean {
    return this.user.role === 'TRANSPORTER';
  }

  isClient(): boolean {
    return this.user.role === 'CLIENT';
  }
}
