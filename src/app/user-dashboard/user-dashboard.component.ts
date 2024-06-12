import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit{

  constructor(private authService : AuthService) {
  }
  ngOnInit() {
    this.authService.autoLogin();
  }

  isSideNavCollapsed = false ;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle) : void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
