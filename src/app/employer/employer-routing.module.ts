import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployerComponent} from "./employer.component";
import {ListEmployesComponent} from "./list-employes/list-employes.component";
import {DetailEmployeComponent} from "./detail-employe/detail-employe.component";
import {ProfileComponent} from "./profile/profile.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [

  {
    path: 'create',
    component: EmployerComponent
  },
  {
    path: 'list',
    component: ListEmployesComponent
  },
  {
    path: 'detail/:id',
    component: DetailEmployeComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
