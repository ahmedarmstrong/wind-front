import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../../service/employe.service";
import {UserDto} from "../../interface/userDto";
import {RegimeDto} from "../../interface/regimeDto";
import {SocieteDto} from "../../interface/societeDto";
import {SocieteService} from "../../service/societe.service";
import {DatePipe, Location} from "@angular/common";
import {filter, throwError} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ConfirmDialogService} from "../composants/confirm-dialog/confirm-dialog.service";
import {AlertService} from "../composants/alert/alert.service";


@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrl: './employer.component.scss',
  providers: [DatePipe],

})
export class EmployerComponent implements OnInit {
  progress = 0;
  step = 1;
  errorMessage: string;
  messageType: 'success' | 'error' = 'error';
  employe: UserDto = { };
  societe: SocieteDto = {};
  listeSociete: Array<SocieteDto> = [];

  constructor(
    private router: Router,
  private employeService: EmployeService,
    private confirmDialogService: ConfirmDialogService,
    private location: Location,
    private alertService: AlertService,
    private societeService: SocieteService,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateProgress();
    });
  }

  ngOnInit(): void {
    this.societeService.findAll().subscribe(societes => {
      this.listeSociete = societes;
      console.log(this.listeSociete);
    });

  }
  next(form: NgForm): void {
    if (form.valid) { // Check if the form is valid
      this.step++; // Increment the step only if the form is valid
    } else {
      Object.keys(form.controls).forEach(field => { // {1}
        const control = form.control.get(field); // {2}
        control!.markAsTouched({ onlySelf: true }); // {3}
      });
    }
  }

  prev() {
    if (this.step > 1) {
      this.step--;
    }
  }
  filterNumbers(event: any): void {
    // Regular expression to remove non-numeric characters from the input
    event.target.value = event.target.value.replace(/\D/g, '');
  }
  updateProgress() {
    switch (this.router.url) {
      case '/step-one':
        this.progress = 33;
        break;
      case '/step-two':
        this.progress = 66;
        break;
      case '/step-three':
        this.progress = 100;
        break;
      default:
        this.progress = 0;
    }
  }


  saveEmploye() {
    if (this.isValidDate(this.employe.dateNaissance!)) {
      // Assuming dateDeNaissance is in 'DD/MM/YYYY' format
      const parts = this.employe.dateNaissance!.split('/');
      if(parts.length === 3) {
        this.employe.dateNaissance = `${parts[0]}/${parts[1]}/${parts[2]}`;
      }
      this.employeService.saveUser(this.employe).subscribe({
        next: (response) => {
          this.alertService.open("User saved successfully")
          setTimeout(() => {
            this.router.navigate(['main/employer/list']);
          }, 3000);
        },
        error: (error) => {
          this.alertService.open(error)
        }
      });
    } else {
      console.error('Invalid date format');
    }
  }

  isValidDate(dateString: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateString.match(regex)) {
      return false; // Invalid format
    }

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
  }

  updateChildNumberField() {
    if (this.employe.situation === 'Celibataire') {
      this.employe.nbrEnfant = "0"; // Reset the number of children
    }
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
    const confirmed = await this.confirmDialogService.open(`Êtes-vous sûr de vouloir retourner en arrière ? Les modifications non enregistrées seront perdues.`);
    if (confirmed) {
      this.location.back()
    }
  }
}
