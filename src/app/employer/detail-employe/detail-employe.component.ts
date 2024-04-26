import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EmployeService} from "../../../service/employe.service";
import {UserDto} from "../../../interface/userDto";
import {Location} from "@angular/common";
import {SocieteService} from "../../../service/societe.service";
import {UpdateUser} from "../../../interface/updateUser";
import {CalendrierService} from "../../../service/calendrier.service";
import {CalendrierDto} from "../../../interface/calendrierDto";


@Component({
  selector: 'app-detail-employe',
  templateUrl: './detail-employe.component.html',
  styleUrl: './detail-employe.component.scss'
})
export class DetailEmployeComponent implements OnInit {
  listeSociete: any[];
  employe: UserDto = { };
  updateUser : UpdateUser = { };
  calendriers: CalendrierDto[] = [];
  userCalendriers: CalendrierDto[] = [];


  constructor(private router: Router,
              private userService: EmployeService,
              private location: Location,
              private societeService: SocieteService,
              private calendrierService: CalendrierService) {
  }

  ngOnInit() {
    this.societeService.findAll().subscribe(societes => {
      this.listeSociete = societes;
      console.log(this.listeSociete);
    });

    this.loadUser();
    this.getCalendreirByUserId()
    this.loadCalendriers()
  }

  loadUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      this.userService.findUserById(+userId) // the '+' converts string to number
        .subscribe({
          next: (user) => {
            this.employe = user
            console.log(user); // Handle the user data as needed
          },
          error: (error) => {
            console.error('Failed to fetch user:', error);
          }
        });
    } else {
      console.error('No user ID found in localStorage');
    }
  }

  private getCurrentUserId(): number | undefined {
    const currentUser = localStorage.getItem('authenticated-user');
    if (!currentUser) return undefined;

    const userData = JSON.parse(currentUser);
    return userData.id; // Adjust based on your actual data structure
  }

  getSocieteNameById(societeId: number | undefined): string {
    const societe = this.listeSociete.find(s => s.id === societeId);
    return societe ? societe.nom : 'Unknown'; // Replace 'name' with your actual property name for societe name
  }

  updateEmployee() {
    // Assuming updateUser should contain the modified data of `employe`
    this.updateUser = { ...this.employe };

    this.userService.updateUser(this.updateUser).subscribe({
      next: (updatedUser) => {
        console.log('Employee updated:', updatedUser);
        // Optionally, navigate away or give feedback
      },
      error: (error) => console.error('Error updating employee:', error)
    });
    this.router.navigate(['main/employer/profile/:id']);
  }
  loadCalendriers(): void {
    this.calendrierService.findAll().subscribe({
      next: (data) => {
        this.calendriers = data;
      },
      error: (error) => {
        console.error('Failed to load calendriers:', error);
      }
    });
  }
  getCalendreirByUserId() {
    const userId = this.getCurrentUserId();
    this.calendrierService.findCalendrierByUserId(userId!).subscribe({
      next: (data) => {
        this.userCalendriers = data;
      },
      error: (error) => console.error('Erreur lors de la récupération des calendriers:', error)
    });
  }

  isUserCalendrier(calendrierId: number): boolean {
    return this.userCalendriers.some(c => c.id === calendrierId);
  }

  backButton(): void{
    this.location.back();
  }

}
