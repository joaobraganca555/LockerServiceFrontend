import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private router: Router, private authService: AuthService) {}

  redirect(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  logout() {
    this.authService.logout();
  }
}
