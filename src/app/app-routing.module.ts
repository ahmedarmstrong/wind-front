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
import {AlertComponent} from "./composants/alert/alert.component";
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {UserDataComponent} from "./user-dashboard/user-data/user-data.component";
import {ListHolidayComponent} from "./list-holiday/list-holiday.component";
import {UserPaieComponent} from "./user-dashboard/user-paie/user-paie.component";
import {Paie} from "./paie/paie.component";
import {UpdatePasswordComponent} from "./user-dashboard/update-password/update-password.component";
import {DashComponent} from "./user-dashboard/dash/dash.component";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'forget-password', component:ForgetPasswordComponent},
  {path: "", redirectTo: "main", pathMatch: "full"},
  {path: "access-denied", component: AccessDeniedComponent},
  {path: "main" , component: MainComponentComponent,  canActivate: [authGuard],
    data: {roles: ['ROLE_ADMIN']},
  children: [
    {path: "dashboard" , component: DashboardComponent},
    {path: "pointage" , component: PointageComponent},
    {path: "ficheDePaie" , component: FichePaieComponent},
    {path: "holidays", component: HolidaysComponent},
    {path: "listHoliday", component: ListHolidayComponent},
    {path: "detail", component: DetailEmployeComponent},
    {path: "alert", component: AlertComponent},
    {path: "profile", component: ProfileComponent},
    {path: "paie", component: Paie},

    {
      path: "employer",
      loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule)
    },
  ]

  },
  {path: "user-dashboard" , component: UserDashboardComponent,  canActivate: [authGuard],
    data: {roles: ['ROLE_USER']},
    children: [
      {path: "dash" , component: DashComponent},
      {path: "user-data", component: UserDataComponent},
      {path: "user-holiday", component: HolidaysComponent},
      {path: "user-paie", component: UserPaieComponent},
      {path: "update-password/:id", component: UpdatePasswordComponent}
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
