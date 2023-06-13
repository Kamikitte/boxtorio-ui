import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showAdminButtons = false;
  showUserButtons = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userRole = this.authService.getRole();
    if( userRole === 'Admin'){
      this.showAdminButtons = true;
    } else {
      this.showUserButtons = true;
    }
  }

}
