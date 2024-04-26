import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss'
})
export class MainComponentComponent implements OnInit{

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
