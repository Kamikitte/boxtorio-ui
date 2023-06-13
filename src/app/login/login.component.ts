import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe(result => {
        if (result) {
          const role = this.authService.getRole();
          if (role !== null) {
            this.router.navigateByUrl('/dashboard');
          }
        } else {
          console.log('Invalid credentials');
        }
      });
  }
}