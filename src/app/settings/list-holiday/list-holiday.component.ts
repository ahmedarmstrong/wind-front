import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HolidayDto} from "../../../interface/holidayDto";
import {HolidaysService} from "../../../service/holidays.service";
import {SocieteHolidaysService} from "../../../service/societeHolidays.service";
import {SocieteHolidaysDto} from "../../../interface/societeHolidaysDto";
import {Status} from "../../../interface/status";

@Component({
  selector: 'app-list-holiday',
  templateUrl: './list-holiday.component.html',
  styleUrl: './list-holiday.component.scss'
})
export class ListHolidayComponent implements OnInit{
  Status = Status;
  societeHolidayIds: (number | undefined)[] = [];
  listHolidays: Array<HolidayDto> = [];
  selectedHolidayId: number | undefined;
  selectedStatus: Status = Status.JOUR_FERIES_CHOMES_ET_PAYES; // Default status


  @Input()


  @Output()
  suppressionResult = new EventEmitter();
  holiday: HolidayDto = {};

  constructor(
      private router: Router,
      private holidayService: HolidaysService,
      private societeHolidaysService: SocieteHolidaysService
  ) { }

  prepareModal(holidayId: number) {
    this.selectedHolidayId = holidayId;
  }

  ngOnInit(): void {
    this.loadSocieteHolidays()
    this.findListHolidays()

  }

  findListHolidays(): void {
    this.holidayService.findAll().subscribe(holidays => {
      this.listHolidays = holidays.map(holiday => {
        if (holiday.date) { // Assuming your HolidayDto has a 'date' field
          holiday.date = this.transformDateToCurrentYear(holiday.date);
        }
        holiday.isHoliday = this.isHolidayInSociete(holiday.id!);
        return holiday;
      });
    });
  }

  searchHolidays(pays: string): void {
    this.holidayService.findAllByPays(pays).subscribe({
      next: (data) => {
        this.listHolidays = data.map(holiday => {
          if (holiday.date) { // Again, assuming 'date' is a field in your HolidayDto
            holiday.date = this.transformDateToCurrentYear(holiday.date);
          }
          holiday.isHoliday = this.isHolidayInSociete(holiday.id!);
          return holiday;
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }



  transformDateToCurrentYear(dateStr: string): string {
    const currentYear = new Date().getFullYear();
    const [day, month] = dateStr.split('/');
    return `${day}-${month}-${currentYear}` ;
  }

  loadSocieteHolidays() {
    this.societeHolidaysService.findHolidaysBySocieteId().subscribe({
      next: (data: SocieteHolidaysDto[]) => {
        // Map each SocieteHolidaysDto to the id of the holidayDto
        this.societeHolidayIds = data.map(holiday => holiday.holidayDto?.id).filter(id => id !== undefined);
        this.findListHolidays();

      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  isHolidayInSociete(holidayId: number): boolean {
    return this.societeHolidayIds.includes(holidayId);
  }

  saveHoliday(): void {
    this.holidayService.saveHoliday(this.holiday)
      .subscribe({
        next: (savedHoliday) => {
          // Optionally refresh the list of holidays from the server
          this.findListHolidays();
          console.log('Holiday saved:', savedHoliday);
        },
        error: (error) => {
          console.error('Error creating Holiday:', error);
        }
      });
  }

  saveAssociationSocieteHoliday() {
    if (this.selectedHolidayId && this.selectedStatus) {
      this.societeHolidaysService.saveSocieteHoliday(this.selectedHolidayId, this.selectedStatus)
        .subscribe({
          next: (response) => {
            console.log('Societe Holiday added successfully', response);
            // Optionally close modal here
          },
          error: (error) => console.error('Error adding Societe Holiday', error)
        });
    }
  }

  enumKeys(e: any): Array<string> {
    return Object.keys(e);
  }

  deleteAssociation() {
    this.societeHolidaysService.delete(this.selectedHolidayId!).subscribe({
      next: (response) => {
        console.log('Deletion successful', response);
        // Optionally, refresh the data or navigate away
      },
      error: (error) => {
        console.error('Error during deletion', error);
      }
    });
  }

  deleteHoliday() {
    this.holidayService.delete(this.selectedHolidayId!).subscribe({
      next: (response) => {
        console.log('Deletion successful', response);
        // Optionally, refresh the data or navigate away
      },
      error: (error) => {
        console.error('Error during deletion', error);
      }
    });
  }

}
