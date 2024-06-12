import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../../service/employe.service";
import {UserDto} from "../../../interface/userDto";
import {Location} from "@angular/common";
import {SocieteService} from "../../../service/societe.service";
import {UpdateUser} from "../../../interface/updateUser";
import {CalendrierService} from "../../../service/calendrier.service";
import {CalendrierDto} from "../../../interface/calendrierDto";
import {ConfirmDialogService} from "../../composants/confirm-dialog/confirm-dialog.service";


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
  userId: string | null = null;
  selectedCalendrierIds: number[] = [];
  isCelibataire: boolean = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: EmployeService,
              private confirmDialogService: ConfirmDialogService,
              private location: Location,
              private societeService: SocieteService,
              private calendrierService: CalendrierService) {
  }

  ngOnInit() {
    this.loadSocietes();
    this.userId = this.route.snapshot.paramMap.get('id'); // Getting userId from route, if applicable
    if (this.userId) {
      this.getCalendreirByUserId(+this.userId); // Assuming userId should be a number
      this.loadUser(+this.userId);
      this.loadCalendriers()
    } else {
      console.error('No userId provided');
    }
  }

  loadUser(userId: number): void {
    if (userId) {
      this.userService.findUserById(+userId) // the '+' converts string to number
        .subscribe({
          next: (user) => {
            this.employe = user
            this.updateNbrEnfantsField();
          },
          error: (error) => {
            console.error('Failed to fetch user:', error);
          }
        });
    } else {
      console.error('No user ID found in localStorage');
    }
  }
  loadSocietes(): void {
    this.societeService.findAll().subscribe(societes => {
      this.listeSociete = societes;
    }, error => {
      console.error('Erreur lors de la récupération des sociétés:', error);
    });
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
        // Optionally, navigate away or give feedback
      },
      error: (error) => console.error('Error updating employee:', error)
    });
    this.loadUser(+this.userId!);
    this.router.navigate(['main/employer/user-profile/',this.userId]);
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
  getCalendreirByUserId(userId: number) {
    this.calendrierService.findCalendrierByUserId(userId!).subscribe({
      next: (data) => {
        this.userCalendriers = data;
      },
      error: (error) => console.error('Erreur lors de la récupération des calendriers:', error)
    });
  }


  onCalendrierToggle(calendrierId: number, event: any): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const index = this.selectedCalendrierIds.indexOf(calendrierId);
    if (isChecked && index === -1) {
      this.selectedCalendrierIds.push(calendrierId);
    } else if (!isChecked && index !== -1) {
      this.selectedCalendrierIds.splice(index, 1);
    }
  }

  submitChanges(): void {
    if (this.userId) {
      const userIdNum = parseInt(this.userId, 10); // Always specify radix
      if (!isNaN(userIdNum)) {
        console.log(userIdNum)
        this.calendrierService.updateUserCalendrier(userIdNum, this.selectedCalendrierIds)
          .subscribe({
            next: (updatedCalendriers) => {
              console.log('Updated Calendriers:', updatedCalendriers);
              // Update the userCalendriers array based on the selectedCalendrierIds
              this.userCalendriers = this.calendriers.filter(cal => this.selectedCalendrierIds.includes(cal.id!));
            },
            error: (error) => console.error('Error updating calendriers:', error)
          });
      } else {
        console.error('Invalid userId:', this.userId);
        // Optionally add user feedback here
      }
    } else {
      console.error('userId is null');
      // Optionally handle this case in the UI, perhaps redirecting or showing a message
    }
  }

  isUserCalendrier(calendrierId: number): boolean {
    return this.userCalendriers.some(c => c.id === calendrierId);
  }

  onSituationChange(): void {
    this.updateNbrEnfantsField();
  }

  updateNbrEnfantsField(): void {
    if (this.employe.situation === 'Celibataire') {
      this.isCelibataire = true;
      this.employe.nbrEnfant = "0";
    } else {
      this.isCelibataire = false;
    }
  }
  async backButton() {
    const confirmed = await this.confirmDialogService.open(`Êtes-vous sûr de vouloir retourner en arrière ? Les modifications non enregistrées seront perdues.`);
    if (confirmed) {
      this.location.back()
    }
  }

}
