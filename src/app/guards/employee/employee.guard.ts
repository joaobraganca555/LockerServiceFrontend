import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isEmployee()) {
      this.alertService.showWarningToast(`You can't access that!`);
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
