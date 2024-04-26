import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CalendrierDto} from "../../../interface/calendrierDto";
import {CalendrierService} from "../../../service/calendrier.service";

@Component({
  selector: 'app-list-calendrier',
  templateUrl: './list-calendrier.component.html',
  styleUrl: './list-calendrier.component.scss'
})
export class ListCalendrierComponent implements OnInit{

  calendrier: CalendrierDto[] = [];






  constructor(
    private router: Router,
    private calendrierService: CalendrierService
  ) { }


  ngOnInit(): void {
    this.loadCalendriers();
  }


  loadCalendriers(): void {
    this.calendrierService.findAll().subscribe({
      next: (data) => {
        this.calendrier = data;
      },
      error: (error) => {
        console.error('Failed to load calendriers:', error);
      }
    });
  }

}
