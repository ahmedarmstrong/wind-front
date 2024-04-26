import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../../service/employe.service";
import {UserDto} from "../../interface/userDto";
import {RegimeDto} from "../../interface/regimeDto";
import {SocieteDto} from "../../interface/societeDto";
import {SocieteService} from "../../service/societe.service";
import {DatePipe} from "@angular/common";
import {throwError} from "rxjs";


@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrl: './employer.component.scss',
  providers: [DatePipe],

})
export class EmployerComponent implements OnInit {
  errorMessage: string;
  employe: UserDto = { };
  societe: SocieteDto = {};
  listeSociete: Array<SocieteDto> = [];

  constructor(
    private datePipe: DatePipe,
    private employeService: EmployeService,
    private societeService: SocieteService
  ) { }

  ngOnInit(): void {
    this.societeService.findAll().subscribe(societes => {
      this.listeSociete = societes;
      console.log(this.listeSociete);
    });

  /*  const idUser = this.activatedRoute.snapshot.params['idUser'];
    if (idUser) {
      this.employeService(idArticle)
        .subscribe(article => {
          this.articleDto = article;
          this.categorieDto = this.articleDto.category ? this.articleDto.category : {};
        });
    }*/
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
          console.log('User saved successfully', response);
        },
        error: (error) => {
          console.error('Error saving user', error);
          this.errorMessage = error;
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




}
