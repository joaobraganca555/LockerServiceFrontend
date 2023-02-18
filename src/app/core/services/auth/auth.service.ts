import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment.development';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private baseServiceUrl = '/auth';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  login(emailOrUsername: string, password: string): Observable<any> {
    return this.http.post(
      `${environment.gatewayBaseUrl}${this.baseServiceUrl}/login`,
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

  logout() {
    localStorage.removeItem('user');
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
    }
    return isExpired;
  }

  isLoggedIn(): boolean {
    // Check if the user has a valid JWT token in local storage
    if (Object.keys(this.user).length === 0) {
      return false;
    } else {
      return this.user.token !== null && !this.isExpired();
    }
  }

  getCurrentUser() {
    return this.user;
  }

  // isClient(): boolean {
  //   return (
  //     this.user?.role === 'CLIENT' &&
  //     new Date() < new Date(this.user?.exp)
  //   );
  // }

  // isAdmin(): boolean {
  //   return (
  //     this.user?.role === 'ADMIN' && new Date() < new Date(this.user?.exp)
  //   );
  // }
}
