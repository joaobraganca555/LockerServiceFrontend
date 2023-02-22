import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProblemDetail } from 'src/app/models/problemDetail.model';
import { UserUpdate } from 'src/app/models/userupdate.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
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
  editMode = false;
  pd: ProblemDetail = new ProblemDetail();
  headerTitle = 'My Account';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alert: AlertService
  ) {
    this.myForm = this.fb.group({
      firstName: [Validators.required],
      lastName: [Validators.required],
      email: [[Validators.required, Validators.email]],
      username: [Validators.required]
    });
  }
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.fillFormWithUserData(user);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  fillFormWithUserData(userData: UserUpdate) {
    this.myForm.setValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username
    });
  }

  editAccount() {
    if (this.editMode) {
      if (this.myForm.valid) {
        this.passwordError = false;
        const newUser = this.myForm.value;
        this.authService.updateUser(newUser).subscribe({
          next: (data) => {
            if (data) {
              console.log(data);
              this.alert.showSuccessToast('Account edited successfully!');
            }
          },
          error: (error) => {
            this.pd = error.error;
            this.failedToRegister = true;
            this.alert.showErrorToast('Error while editing account!');
          }
        });
        this.toggleEditMode();
      }
    } else {
      this.toggleEditMode();
    }
  }
}
