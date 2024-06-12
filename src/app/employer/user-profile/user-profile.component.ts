import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from "../../../interface/userDto";
import {CalendrierDto} from "../../../interface/calendrierDto";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../../service/employe.service";
import {CalendrierService} from "../../../service/calendrier.service";
import {SocieteService} from "../../../service/societe.service";
import {Location} from "@angular/common";
import {AlertService} from "../../composants/alert/alert.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  listeSociete: any[];
  employe: UserDto = { };
  calendriers: CalendrierDto[] = [];
  error: string | null = null; // Gestion des erreurs
  userId: string | null = null;
  @Input()
  isNouveauVisible = true;
  selectedUserId: number | undefined;
  errorMessage: string;
  messageType: 'success' | 'error' = 'error';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private alertService: AlertService,
              private userService: EmployeService,
              private calendrierService: CalendrierService,
              private societeService: SocieteService,) {
  }

  ngOnInit() {
    this.loadSocietes();
    this.userId = this.route.snapshot.paramMap.get('id'); // Getting userId from route, if applicable
    if (this.userId) {
      this.loadCalendriers(+this.userId); // Assuming userId should be a number
      this.loadUser(+this.userId);
    } else {
      console.error('No userId provided');
    }
  }

  loadUser(userId: number): void {
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
  }

  loadSocietes(): void {
    this.societeService.findAll().subscribe(societes => {
      this.listeSociete = societes;
      console.log(this.listeSociete);
    }, error => {
      console.error('Erreur lors de la récupération des sociétés:', error);
    });
  }
  loadCalendriers(userId: number): void {
    this.calendrierService.findCalendrierByUserId(userId).subscribe({
      next: (data) => {
        this.calendriers = data;
      },
      error: (error) => console.error('Erreur lors de la récupération des calendriers:', error)
    });
  }

  getSocieteNameById(societeId: number | undefined): string {
    const societe = this.listeSociete.find(s => s.id === societeId);
    return societe ? societe.nom : 'Unknown'; // Replace 'name' with your actual property name for societe name
  }
  deleteEmployer() {
    this.userService.delete(this.selectedUserId!).subscribe({
      next: (response) => {
        this.alertService.open("Employer Delete successfully")
        setTimeout(() => {
          this.router.navigate(['main/employer/list']);
          }, 2000);
      },
      error: (error) => {
        this.alertService.open(error);
      }
    });

  }
  prepareModal(holidayId: number) {
    this.selectedUserId = holidayId;
  }
  updateEmploye(): void {
    this.router.navigate(['main/employer/detail/', this.userId]);
  }
  backButton(): void{
    this.location.back();
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
}
