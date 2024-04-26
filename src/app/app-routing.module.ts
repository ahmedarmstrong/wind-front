import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PointageComponent} from "./pointage/pointage.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FichePaieComponent} from "./fiche-paie/fiche-paie.component";
import {LoginComponent} from "./login/login.component";
import {authGuard} from "../helpers/auth.guard";
import {MainComponentComponent} from "./main-component/main-component.component";
import {HolidaysComponent} from "./holidays/holidays.component";
import {DetailEmployeComponent} from "./employer/detail-employe/detail-employe.component";
import {AccessDeniedComponent} from "./access-denied/access-denied.component";
import {ProfileComponent} from "./employer/profile/profile.component";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: "", redirectTo: "main", pathMatch: "full"},
  {path: "access-denied", component: AccessDeniedComponent},
  {path: "main" , component: MainComponentComponent,  canActivate: [authGuard],
    data: {roles: ['ROLE_ADMIN','ROLE_USER']},
  children: [
    {path: "dashboard" , component: DashboardComponent},
    {path: "pointage" , component: PointageComponent},
    {path: "ficheDePaie" , component: FichePaieComponent},
    {path: "holidays", component: HolidaysComponent, canActivate: [authGuard], data: {roles: ['ROLE_ADMIN']}},
    {path: "detail", component: DetailEmployeComponent},

    {path: "profile", component: ProfileComponent},

    {
      path: "employer",
      loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule)
    },
    {
      path: "settings",
      loadChildren:() => import('./settings/settings.module').then(m => m.SettingsModule)
    }
  ]
  },
 /* {path: "public", component: ,  canActivate: [authGuard],
    data: {roles: ['ROLE_USER']},
    children:[
      {path: ""}
    ]

  }*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
