import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProblemDetail } from 'src/app/models/problemDetail.model';
import { RegisterUser } from 'src/app/models/registerUser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myForm: FormGroup;
  passwordError = false;
  passwordErrorText = '';
  failedToRegister = false;
  pd: ProblemDetail = new ProblemDetail();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {
    this.myForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  redirect(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  register() {
    if (this.myForm.value.password !== this.myForm.value.confirmPassword) {
      this.passwordError = true;
      this.passwordErrorText = 'Passwords does not match';
      return;
    }
    this.passwordError = false;

    const newUser = new RegisterUser(
      this.myForm.value.firstName,
      this.myForm.value.lastName,
      this.myForm.value.email,
      this.myForm.value.username,
      this.myForm.value.password,
      this.myForm.value.confirmPassword
    );

    this.authService.register(newUser).subscribe({
      next: (data) => {
        if (data) {
          this.alert.showSuccessToast('Registration successfully');
          this.redirect('');
        }
      },
      error: (error) => {
        this.pd = error.error;
        this.failedToRegister = true;
      }
    });
  }
}
