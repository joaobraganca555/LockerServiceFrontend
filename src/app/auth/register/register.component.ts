import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RegisterUser } from 'src/app/models/registerUser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myForm: FormGroup;

  firstName = '';
  lastName = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  passwordError = false;
  passwordErrorText = '';

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
      password2: ['', Validators.required]
    });
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.passwordError = true;
      this.passwordErrorText = 'Passwords does not match';
      return;
    }

    const newUser = new RegisterUser(
      this.firstName,
      this.lastName,
      this.email,
      this.username,
      this.password,
      this.confirmPassword
    );

    this.authService.register(newUser).subscribe({
      next: (data) => {
        if (data) {
          this.alert.showSuccessToast('Registration successfully');
          this.router.navigate(['']);
        }
      }
      // error: () => {}
    });
  }
}
