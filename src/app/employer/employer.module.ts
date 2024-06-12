import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import {EmployerComponent} from "./employer.component";
import { ListEmployesComponent } from './list-employes/list-employes.component';
import {FormsModule} from "@angular/forms";
import { DetailEmployeComponent } from './detail-employe/detail-employe.component';
import { ProfileComponent } from './profile/profile.component';
import {ExactLengthValidatorDirective} from "../../validator/ExactLengthValidatorDirective";
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    EmployerComponent,
    ListEmployesComponent,
    DetailEmployeComponent,
    ProfileComponent,
    UserProfileComponent,
  ],
    imports: [
        CommonModule,
        EmployerRoutingModule,
        FormsModule,
        ExactLengthValidatorDirective
    ]
})
export class EmployerModule {



}


