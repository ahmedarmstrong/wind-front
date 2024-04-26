import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../interface/user";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{

  pubContent : string = '';
  user! : User;
  AuthUserSub! : Subscription;
  constructor(
    private userService : UserService,
    private authService : AuthService
  ) {
  }
  ngOnInit(): void {

    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next : user => {
        if(user) this.user = user;
      }
    })

    this.userService.getUserPublicContent().subscribe({
      next : data => {
        this.pubContent = data;
      },
      error : err => console.log(err)
    })
  }
  ngOnDestroy() {
    this.AuthUserSub.unsubscribe();
  }

}
