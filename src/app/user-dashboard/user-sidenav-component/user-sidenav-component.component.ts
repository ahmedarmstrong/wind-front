import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {fadeInOut, INavbarData} from "../../sidenav/helper";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {navDAta} from "./nav";
import {SubMenuComponent} from "./sub-menu.component";
interface SideNavTogglee {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-user-sidenav-component',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    NgClass,
    RouterLinkActive,
    SubMenuComponent
  ],
  templateUrl: './user-sidenav-component.component.html',
  styleUrl: './user-sidenav-component.component.scss',
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
            keyframes([
              style({transform: 'rotate(0deg)', offset: '0'}),
              style({transform: 'rotate(2turn)', offset: '1'})
            ])
        )
      ])
    ])
  ]
})
export class UserSidenavComponentComponent {


  @Output() onToggleSideNav: EventEmitter<SideNavTogglee> = new EventEmitter();
  collapsed = false ;
  screenWidth = 0 ;
  navData = navDAta;
  multiple = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }
  constructor(public router: Router) {
  }

  toggleCollapse() : void{
    this.collapsed= !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData) :void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData) : string {
    return  this.router.url.includes(data.routeLink) ? 'active' : ''
  }

  shrinkItems (item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
