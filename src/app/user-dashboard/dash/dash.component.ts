import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from "../../../interface/userDto";
import {User} from "../../../interface/user";
import {Subscription} from "rxjs";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";
import {EmployeService} from "../../../service/employe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit{
  employe: UserDto = { };
  user! : User;
  constructor(
    private router: Router,
    private employerService: EmployeService,

  ) {
  }
  ngOnInit(): void {
    this.loadUser();
  }


  private getCurrentUserId(): number | undefined {
    const currentUser = localStorage.getItem('authenticated-user');
    if (!currentUser) return undefined;

    const userData = JSON.parse(currentUser);
    return userData.id; // Adjust based on your actual data structure
  }

  loadUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      this.employerService.findUserById(+userId) // the '+' converts string to number
        .subscribe({
          next: (user) => {
            this.employe = user
          },
          error: (error) => {
            console.error('Failed to fetch user:', error);
          }
        });
    } else {
      console.error('No user ID found in localStorage');
    }
  }
  viewProfile(): void {
    this.router.navigate(['/user-dashboard/user-data/']);
  }

}
