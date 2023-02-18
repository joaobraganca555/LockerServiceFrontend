import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { problemDetail } from 'src/app/models/problemDetail.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  emailOrUsername = '';
  password = '';
  failedLogin = false;
  pd: problemDetail | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  redirect(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  login() {
    this.authService
      .login(this.emailOrUsername, this.password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          if (data) {
            this.router.navigate([`home`]);
            this.failedLogin = false;
          }
        },
        (error) => {
          this.pd = error.error;
          this.failedLogin = true;
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
