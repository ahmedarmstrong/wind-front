import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { PointageComponent } from './pointage/pointage.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './header/header.component';
import {CdkMenuModule} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { FichePaieComponent } from './fiche-paie/fiche-paie.component';
import { LoginComponent } from './login/login.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { LoaderComponent } from './composants/loader/loader.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { SplashScreenComponent } from './composants/splash-screen/splash-screen.component';
import {HttpInterceptorsModule} from "../helpers/httpInterceptorsModule.module";
import { AlertComponent } from './composants/alert/alert.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {UserSidenavComponentComponent} from "./user-dashboard/user-sidenav-component/user-sidenav-component.component";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserHeaderComponent } from './user-dashboard/user-header/user-header.component';
import { UserDataComponent } from './user-dashboard/user-data/user-data.component';
import { UserPaieComponent } from './user-dashboard/user-paie/user-paie.component';
import {Paie} from "./paie/paie.component";
import {ListHolidayComponent} from "./list-holiday/list-holiday.component";
import { UpdatePasswordComponent } from './user-dashboard/update-password/update-password.component';
import {ToastrModule} from "ngx-toastr";
import { DashComponent } from './user-dashboard/dash/dash.component';
import { ConfirmDialogComponent } from './composants/confirm-dialog/confirm-dialog.component';
import { SpinnerComponent } from './composants/spinner/spinner.component';

export function loadCrucialData() {
  return function() {
    // or use UserService
    return delay(540);
  }
}

export function delay(delay: number) {
  return function() {
    return new Promise(function(resolve) {
      setTimeout(resolve, delay);
    });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    PointageComponent,
    DashboardComponent,
    HeaderComponent,
    FichePaieComponent,
    LoginComponent,
    MainComponentComponent,
    LoaderComponent,
    HolidaysComponent,
    AccessDeniedComponent,
    SplashScreenComponent,
    AlertComponent,
    UserDashboardComponent,
    ForgetPasswordComponent,
    UserHeaderComponent,
    UserDataComponent,
    UserPaieComponent,
    Paie,
    ListHolidayComponent,
    UpdatePasswordComponent,
    DashComponent,
    ConfirmDialogComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SidenavComponent,
    OverlayModule,
    CdkMenuModule,
    HttpClientModule,
    FormsModule,
    HttpInterceptorsModule,
    UserSidenavComponentComponent,
/*
    MatProgressSpinnerModule,
*/
    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    {provide : APP_INITIALIZER, multi: true,  useFactory: loadCrucialData()}
  ],
  exports: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
