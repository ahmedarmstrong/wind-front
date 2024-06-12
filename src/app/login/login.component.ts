import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {LoginModel} from "../../interface/login-model";
import {EmployeService} from "../../service/employe.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy{
  emaill: string = '';
  message: string = '';
  errorMessage! : string;
  AuthUserSub! : Subscription;



  constructor(private authService : AuthService,
              private router : Router,
              private userService: EmployeService) {
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
        this.router.navigate(['main/dashboard']);
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
  onSubmit() {
    this.userService.resetPassword(this.emaill).subscribe({
      next: (response) => {
        this.message = response.message;  // Assuming response comes with a message field
      },
      error: (error) => {
        this.message = 'Failed to reset password. Please try again later.';
      }
    });
  }
  protected readonly console = console;
}
