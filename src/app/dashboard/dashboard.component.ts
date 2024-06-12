import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../interface/user";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";
import {EmployeService} from "../../service/employe.service";
import {UserDto} from "../../interface/userDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{
  employe: UserDto = { };
  grades = ['RH', 'IT', 'DESIGN', 'Marketing'];
  userCounts: { [key: string]: number } = {};
  pubContent : string = '';
  user! : User;
  AuthUserSub! : Subscription;
  constructor(
    private userService : UserService,
    private router: Router,
    private authService : AuthService,
    private employerService: EmployeService,
  ) {
  }
  ngOnInit(): void {
    this.fetchCounts();
    this.loadUser();
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
  private getCurrentUserId(): number | undefined {
    const currentUser = localStorage.getItem('authenticated-user');
    if (!currentUser) return undefined;

    const userData = JSON.parse(currentUser);
    return userData.id; // Adjust based on your actual data structure
  }

  fetchCounts(): void {
    this.grades.forEach(grade => {
      this.userService.getCountByGrade(grade).subscribe(count => {
        this.userCounts[grade] = count;
      });
    });
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
    const userId = this.getCurrentUserId();
    this.router.navigate(['main/employer/profile/',userId]);
  }

}
