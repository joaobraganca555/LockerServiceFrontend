import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProblemDetail } from 'src/app/models/problemDetail.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrUsername = '';
  password = '';
  failedLogin = false;
  pd = new ProblemDetail();

  constructor(private router: Router, private authService: AuthService) {}

  redirect(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  login() {
    if (this.emailOrUsername === '' || this.password === '') {
      this.failedLogin = true;
      this.pd.detail = 'Empty password or email';
    } else {
      this.authService.login(this.emailOrUsername, this.password).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigate(['home']);
            this.failedLogin = false;
          }
        },
        error: (error) => {
          this.pd = error.error;
          this.failedLogin = true;
        }
      });
    }
  }
}
