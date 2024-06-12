import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EmployeService} from "../../../service/employe.service";
import {AuthService} from "../../../service/auth.service";
import {user} from "./header-data";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent implements OnInit{

  userItems = user;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  canShowSearchAsOverlay = false;
  constructor(private router: Router, private userService: EmployeService, private authService : AuthService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);

  }

  ngOnInit() {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  getHeadClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number){
    if(innerWidth < 845){
      this.canShowSearchAsOverlay = true;
    }else {
      this.canShowSearchAsOverlay = false;
    }
  }

  navigate(path: string): void {
    if (path === '/user-data') {
      this.navigateToUserDetail()
    }
    else if (path === '/logout') {
      this.handleLogout()
    } else {
      this.router.navigate([path]);
    }
  }


  private getCurrentUserId(): number | undefined {
    const currentUser = localStorage.getItem('authenticated-user');
    if (!currentUser) return undefined;

    const userData = JSON.parse(currentUser);
    return userData.id; // Adjust based on your actual data structure
  }

  navigateToUserDetail(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      this.router.navigate(['/user-data', userId]);
    } else {
      console.error('No user ID found');
    }
  }

  handleLogout() {
    this.authService.logout();
  }
}
