import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProblemDetail } from 'src/app/models/problemDetail.model';
import { RegisterUserAdmin } from 'src/app/models/registerUserAdmin.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  myForm: FormGroup;

  firstName = '';
  lastName = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  passwordError = false;
  passwordErrorText = '';
  failedToRegister = false;
  pd: ProblemDetail = new ProblemDetail();
  headerTitle = 'Create User';
  role = '';

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
      password1: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  redirect(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  createUser() {
    this.passwordError = false;
    const newUserRole = new RegisterUserAdmin(
      this.firstName,
      this.lastName,
      this.email,
      this.username,
      this.password,
      this.role
    );

    this.authService.registerUserAdmin(newUserRole).subscribe({
      next: (data) => {
        if (data) {
          this.alert.showSuccessToast('Registration successfully');
          this.myForm.reset();
        }
      },
      error: (error) => {
        this.myForm.reset();
        console.error(error);
        this.pd = error.error;
        this.failedToRegister = true;
        this.alert.showErrorToast('Failed to create user!');
      }
    });
  }
}
