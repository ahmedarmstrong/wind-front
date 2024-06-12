import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from "../../../interface/userDto";
import {CalendrierDto} from "../../../interface/calendrierDto";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../../service/employe.service";
import {CalendrierService} from "../../../service/calendrier.service";
import {SocieteService} from "../../../service/societe.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent   implements OnInit {
  listeSociete: any[];
  employe: UserDto = { };
  calendriers: CalendrierDto[] = [];
  error: string | null = null; // Gestion des erreurs

  @Input()
  isNouveauVisible = true;


  constructor(private router: Router,
              private userService: EmployeService,
              private location: Location,
              private calendrierService: CalendrierService,
              private societeService: SocieteService,) {
  }

  ngOnInit() {
    this.societeService.findAll().subscribe(societes => {
      this.listeSociete = societes;
      console.log(this.listeSociete);
    });
    const userId = this.getCurrentUserId();
    this.calendrierService.findCalendrierByUserId(userId!).subscribe({
      next: (data) => {
        this.calendriers = data;
      },
      error: (error) => console.error('Erreur lors de la récupération des calendriers:', error)
    });

    this.loadUser();
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
  updatePassword(id: number): void {
    this.router.navigate(['user-dashboard/update-password', id]);
  }
  backButton(): void{
    this.location.back();
  }
}


