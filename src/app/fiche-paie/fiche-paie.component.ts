import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../../service/employe.service";
import {UserDto} from "../../interface/userDto";
import {CalculSalaireService} from "../../service/calculSalaire.service";

@Component({
  selector: 'app-fiche-paie',
  templateUrl: './fiche-paie.component.html',
  styleUrl: './fiche-paie.component.scss'
})
export class FichePaieComponent implements OnInit{
  isHeadOfFamily: boolean = false;
  numberOfChildren: number = 0;
  isBrutToNet: boolean = true;
  estimation:number;
  salaireBrut: number;
  getSalairy:number;
  netSalary: number;
  cnss:number;
  css: number;
  irpp: number;
  salaireImposable: number;
  constructor(private calcul: CalculSalaireService) { }

  ngOnInit() {
  }
  onFamilyHeadChange(): void {
    if (!this.isHeadOfFamily) {
      this.numberOfChildren = 0;
    }
    this.calculateAll();
  }

  onSalaryChange(): void {
    this.calculateAll();
  }

  onEstimationChange(): void {
    this.calculateAll();
  }


  calculateAll(): void {
    if (this.isBrutToNet) {
      this.getNetSalary();
      this.getCnss();
      this.getCss();
      this.getSalaireImposable();
      this.getIrpp();
    } else {
      this.getBrutSalary()
    }
  }
  continueWithOppositeCalculations(): void {
    this.getOppositCnss();
    this.getOppositCss();
    this.getOppositSalaireImposable();
    this.getOppositIrpp();
  }

  getNetSalary(): void {
    this.calcul.calculateNetSalary(this.salaireBrut, this.isHeadOfFamily, this.numberOfChildren).subscribe({
      next: (data) => {
        this.netSalary = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  getBrutSalary(): void {
    this.calcul.estimateSalaireBrut(this.estimation, this.isHeadOfFamily, this.numberOfChildren).subscribe({
      next: (data) => {
        this.getSalairy = data;
        this.continueWithOppositeCalculations();  // Trigger the next set of calculations
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  getCnss(): void {
    this.calcul.calculateCnss(this.salaireBrut).subscribe({
      next: (data) => {
        this.cnss = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  } getOppositCnss(): void {
    this.calcul.calculateCnss(this.getSalairy).subscribe({
      next: (data) => {
        this.cnss = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  getCss(): void {
    this.calcul.calculateCss(this.salaireBrut, this.isHeadOfFamily, this.numberOfChildren).subscribe({
      next: (data) => {
        this.css = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  getOppositCss(): void {
    this.calcul.calculateCss(this.getSalairy, this.isHeadOfFamily, this.numberOfChildren).subscribe({
      next: (data) => {
        this.css = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  getSalaireImposable(): void {
    this.calcul.calculateSalaireImposable(this.salaireBrut, this.isHeadOfFamily, this.numberOfChildren).subscribe({
      next: (data) => {
        this.salaireImposable = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  getOppositSalaireImposable(): void {
    this.calcul.calculateSalaireImposable(this.getSalairy, this.isHeadOfFamily, this.numberOfChildren).subscribe({
      next: (data) => {
        this.salaireImposable = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  getIrpp(): void {
    this.calcul.calculateIrpp(this.salaireBrut, this.isHeadOfFamily, this.numberOfChildren).subscribe({
      next: (data) => {
        this.irpp = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  getOppositIrpp(): void {
    this.calcul.calculateIrpp(this.getSalairy, this.isHeadOfFamily, this.numberOfChildren).subscribe({
      next: (data) => {
        this.irpp = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  toggleButtonText(): void {
    this.isBrutToNet = !this.isBrutToNet;
  }
  resetAllData(): void {
    this.isHeadOfFamily = false;
    this.numberOfChildren = 0;
    this.cnss = 0
    this.css = 0
    this.netSalary = 0
    this.salaireBrut = 0
    this.getSalairy = 0
    this.salaireImposable = 0
    this.irpp = 0
    this.estimation= 0
  }


}
