import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListHolidayComponent} from "./list-holiday/list-holiday.component";
import {ListCalendrierComponent} from "./list-calendrier/list-calendrier.component";


const routes: Routes = [

    {
        path: 'listCalendrier',
        component: ListCalendrierComponent
    },
    {
        path: 'listHoliday',
        component: ListHolidayComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
