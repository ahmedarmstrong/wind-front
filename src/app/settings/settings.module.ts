import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {FormsModule} from "@angular/forms";
import { ListHolidayComponent } from './list-holiday/list-holiday.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import { ListCalendrierComponent } from './list-calendrier/list-calendrier.component';


@NgModule({
    declarations: [


      ListHolidayComponent,
      ListCalendrierComponent
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        FormsModule
    ]
})
export class SettingsModule {



}


