import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAdmin: boolean = this.authService.isAdmin();
  isEmployee: boolean = this.authService.isEmployee();
  isTransporter: boolean = this.authService.isTransporter();
  isClient: boolean = this.authService.isClient();

  constructor(private router: Router, private authService: AuthService) {}

  redirect(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
}
