import {Component, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import {navbarDAta} from "./nav-data";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SublevelMenuComponent} from "./sublevel-menu.component";
import {fadeInOut, INavbarData} from "./helper";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    NgClass,
    RouterLinkActive,
    SublevelMenuComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
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
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false ;
  screenWidth = 0 ;
  navData = navbarDAta;
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
