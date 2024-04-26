import { Component, OnInit} from '@angular/core';
import {SocieteHolidaysService} from "../../service/societeHolidays.service";
import {SocieteHolidaysDto} from "../../interface/societeHolidaysDto";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Page} from "../../interface/page";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, map, startWith} from "rxjs/operators";
import {Status} from "../../interface/status";

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrl: './holidays.component.scss'
})
export class HolidaysComponent implements OnInit{

  societeHolidays: SocieteHolidaysDto[] = [];




  holidayState$: Observable<{ appState: string, appData?:  Page<SocieteHolidaysDto>, error?: HttpErrorResponse }>;

  // @ts-ignore
  responseSubject = new BehaviorSubject<Page<SocieteHolidaysDto>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor( private societeHolidaysService: SocieteHolidaysService) {}



  ngOnInit(): void {
    this.holidayState$ = this.societeHolidaysService.holidays$().pipe(
      map((response: Page<SocieteHolidaysDto>) => {
        // Assuming each SocieteHolidaysDto has a 'holidayDate' in 'DD/MM' format
        response.content.forEach(holiday => {
          if (holiday.holidayDto?.date) {
            holiday.holidayDto.date = this.transformDateToCurrentYear(holiday.holidayDto.date);
          }
        });

        this.responseSubject.next(response);
        this.currentPageSubject.next(response.number);
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: response });
      }),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error: HttpErrorResponse) => {
        return of({ appState: 'APP_ERROR', error });
      })
    );
  }

 /* loadHolidays() {
    this.societeHolidaysService.findHolidaysBySocieteId().subscribe({
      next: (data: SocieteHolidaysDto[]) => {
        this.societeHolidays = data.map(societeHoliday => {
          if (societeHoliday.holidayDto?.date) {
            societeHoliday.holidayDto.date = this.transformDateToCurrentYear(societeHoliday.holidayDto.date);
          }
          return societeHoliday;
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }*/
  transformDateToCurrentYear(dateStr: string): string {
    const currentYear = new Date().getFullYear();
    const [day, month] = dateStr.split('/');
    return `${day}-${month}-${currentYear}` ;
  }

  gotToPage(societeId?: number, pageNumber: number = 0): void {
    this.holidayState$ = this.societeHolidaysService.holidays$( pageNumber).pipe(
      map((response: Page<SocieteHolidaysDto>) => {
        response.content.forEach(holiday => {
          if (holiday.holidayDto?.date) {
            holiday.holidayDto.date = this.transformDateToCurrentYear(holiday.holidayDto.date);
          }
        });
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: response });
      }),
      startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
      catchError((error: HttpErrorResponse) =>{
        return of({ appState: 'APP_ERROR', error })}
      )
    )
  }


  goToNextOrPreviousPage(direction?: string, societeId?: number): void {
    this.gotToPage(societeId, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }


  protected readonly Status = Status;
}
