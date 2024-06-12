import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../service/employe.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  token: string;
  password: string;
  confirmPassword: string;
  errorMessage: string;
  messageType: 'success' | 'error' = 'error';

  constructor(
    private authService: EmployeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('token: ', this.token);
    });
  }
  onSubmit() {
    this.authService.confirmPassword(this.token, this.password, this.confirmPassword).subscribe({
      next: (response) => {
        this.setSuccessMessage("Password reset successfully");
        setTimeout(() => {
          this.backButton(); // Redirect after 5 seconds
        }, 3000);
      },
      error: (error) => {
        this.setErrorMessage(error);
      }
    });
  }

  setSuccessMessage(message: string) {
    this.errorMessage = message;
    this.messageType = 'success';
    this.clearMessage();
  }
  setErrorMessage(message: string) {
    this.errorMessage = message;
    this.messageType = 'error';
    this.clearMessage();
  }
  clearMessage() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000); // Auto-clear the message after 5 seconds
  }
  backButton(): void{
    this.router.navigate(['/login']);
  }

}
