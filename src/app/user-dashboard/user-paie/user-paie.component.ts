import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../../interface/userDto";
import {Router} from "@angular/router";
import {AlfrescoService} from "../../../service/alfresco.service";
import {EmployeService} from "../../../service/employe.service";

interface FicheNameDto {
  ficheName: string;
}

interface FileNameParts {
  nom: string;
  prenom: string;
  mois: string;
  annee: string;
}

interface NameParts {
  nom: string;
  prenom: string;
}

@Component({
  selector: 'app-user-paie',
  templateUrl: './user-paie.component.html',
  styleUrl: './user-paie.component.scss'
})
export class UserPaieComponent implements OnInit{
  ficheNames: FicheNameDto[] = [];
  parsedFicheNames: FileNameParts[] = [];
  users: UserDto = { };
  name: string;
  month: string;
  year: string;
  searchTerm: string = '';
  searchResults: string[] = [];
  documentName: string;
  documentUrl: string;
  errorMessage: string;
  messageType: 'success' | 'error' = 'error';
  months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' }
  ];



  constructor(
    private alfrescoService: AlfrescoService,
    private employerService: EmployeService,
  ) { }


  ngOnInit(): void {
    const userId = this.getCurrentUserId();
    this.alfrescoService.getFicheNamesForCurrentUser(+userId!).subscribe(
      (data: FicheNameDto[]) => {
        console.log('Received data:', data); // Log the data
        this.ficheNames = data;
        this.parsedFicheNames = this.ficheNames.map(fiche => this.parseFileName(fiche.ficheName));
        console.log('Parsed fiche names:', this.parsedFicheNames);
      },
      error => console.error('There was an error!', error)
    );

    this.loadUsers();
    this.searchTerm = this.users.nom!;this.users.prenom!
    this.search()
  }


  fetchDocument(): void {
    this.alfrescoService.getDocumentUrl(this.name, this.month!, this.year!).subscribe({
      next: (response) => {
        this.documentName =this.name;
        console.log("this" , this.documentName)// assuming response has a name property
        this.documentUrl = response;
        this.setSuccessMessage("Document is Available");// assuming response has a url property
      },
      error: (err) => {
        this.setErrorMessage("No Payroll Found For this Month");
      }
    });
  }

  search(): void {
    this.alfrescoService.searchNodes(this.searchTerm).subscribe({
      next: (results) => this.searchResults = results,
      error: (error) => console.error('Error fetching search results:', error)
    });
  }
  loadUsers() {
    const userId = this.getCurrentUserId();
    this.employerService.findUserById(userId!).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        this.setErrorMessage(error);
      }
    });
  }
  openDocument(ficheName: string): void {
    this.alfrescoService.getDocumentUrlByName(ficheName).subscribe(
      (url: string) => {
        window.open(url, '_blank');
      },
      error => {
        console.error('Failed to get document URL:', error);
      }
    );
  }


  private getCurrentUserId(): number | undefined {
    const currentUser = localStorage.getItem('authenticated-user');
    if (!currentUser) return undefined;
    const userData = JSON.parse(currentUser);
    return userData.id; // Adjust based on your actual data structure
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

  parseFileName(fileName: string): FileNameParts {
    const parts = fileName.split('-'); // Splitting by '-' as per your filename format
    const nomPrenom = parts[0];
    const mois = parts[1];
    const annee = parts[2].replace('.pdf', ''); // Removing the file extension

    const nameParts = this.splitName(nomPrenom);
    return { nom: nameParts.nom, prenom: nameParts.prenom, mois, annee };
  }

  splitName(fullName: string): NameParts {
    const index = fullName.search(/[A-Z][a-z]*$/);  // Find the position where the last name starts
    const nom = fullName.substring(0, index);       // Extract the first part as nom
    const prenom = fullName.substring(index);       // Extract the last part as prenom
    return { nom, prenom };
  }

}
