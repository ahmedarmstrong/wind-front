import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {LoginModel} from "../../interface/login-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy{

  errorMessage! : string;
  AuthUserSub! : Subscription;



  constructor(private authService : AuthService, private router : Router) {
  }

  ngOnInit() {
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next : user => {
        if(user) {
          this.router.navigate(['main']);
        }
      }
    })
  }

  onSubmitLogin(formLogin: NgForm) {
    if(!formLogin.valid){
      return;
    }
    const email = formLogin.value.email;
    const password = formLogin.value.password;

    this.authService.login(email, password).subscribe({
      next : userData => {
        this.router.navigate(['main']);
      },
      error : err => {
        this.errorMessage = err;
        console.log(err);
      }

    })
  }
  ngOnDestroy() {
    this.AuthUserSub.unsubscribe();
  }

  protected readonly console = console;
}
