import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {fadeInOut, INavbarData} from "../../sidenav/helper";

@Component({
  selector: 'app-sub-menu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length > 0"
        [@submenu]="expanded ?
        {value: 'visible',
         params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}}
        : {value: 'hidden',
         params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}}  "
        class="sublevel-nav">
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a class="sublevel-nav-link"
           (click)="handleClick(item)"
           *ngIf="item.items &&item.items.length > 0"
        [ngClass]="getActiveClass(item)"
        >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
          <i *ngIf="item.items && collapsed" class="menu-collapse-icon"
            [ngClass]="!item.expanded ? 'fal fa-angle-right': 'fal fa-angle-down'"
          ></i>
        </a>
        <a class="sublevel-nav-link"
           *ngIf="!item.items || (item.items && item.items.length === 0)"
           [routerLink]="[item.routeLink]"
           routerLinkActive="avtive-sublevel"
           [routerLinkActiveOptions]="{exact: true}"
        >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <app-sub-menu
            [data]="item"
          [collapsed]="collapsed"
          [multiple]="multiple"
          [expanded]="item.expanded"
          ></app-sub-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrl: './user-sidenav-component.component.scss',
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: 'hidden'}),
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SubMenuComponent implements OnInit{

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() collapsed = false ;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple = false;


  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  handleClick(item: any) : void {
    if (!this.multiple){
      if(this.data.items && this.data.items.length > 0){
        for(let modelItem of this.data.items){
          if(item !==modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData) : string {
    return item.expanded && this.router.url.includes(item.routeLink)
      ? 'active-sublevel'
      : ''
  }
}