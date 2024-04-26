import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit{

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClas(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;

  }
  constructor(private authService : AuthService) {
  }
  ngOnInit() {
    this.authService.autoLogin();
  }

  isSideNavCollapsed = false ;

  onToggleSideNav(data: SideNavToggle) : void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
