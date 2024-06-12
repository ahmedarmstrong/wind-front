import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../../service/employe.service";
import {UpdatePassword} from "../../../interface/updatePassword";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {AlertService} from "../../composants/alert/alert.service";
import {ConfirmDialogService} from "../../composants/confirm-dialog/confirm-dialog.service";


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent implements OnInit {
  errorMessage: string = '';
  passwordsMatch: boolean = true;
  messageType: 'success' | 'error' = 'error';
  userId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private confirmDialogService: ConfirmDialogService,
              private alertService: AlertService,
              private userService: EmployeService) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!; // '+' converts the string to a number
    });
  }


  onUpdatePassword(form: NgForm) {
    if (form.invalid) {
      return; // Prevent submission if form is invalid
    }

    const updatePasswordData: UpdatePassword = {
      id: this.userId,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword
    };

    this.userService.updatePassword(updatePasswordData).subscribe({
      next: (response) => {
        this.alertService.open("Password updated successfully");
        setTimeout(() => {
          this.backButton(); // Redirect after 5 seconds
        }, 3000);
      },
      error: (error) => {
        this.alertService.open(error);
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
  async backButton() {
    const confirmed = await this.confirmDialogService.open(`Êtes-vous sûr de vouloir retourner en arrière ?`);
    if (confirmed) {
      this.location.back()
    }
  }
}
