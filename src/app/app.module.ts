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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { FichePaieComponent } from './fiche-paie/fiche-paie.component';
import { LoginComponent } from './login/login.component';
import {HttpInterceptor} from "../helpers/http.interceptor";
import { MainComponentComponent } from './main-component/main-component.component';
import { LoaderComponent } from './composants/loader/loader.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { SplashScreenComponent } from './composants/splash-screen/splash-screen.component';
import {HttpInterceptorsModule} from "../helpers/httpInterceptorsModule.module";

export function loadCrucialData() {
  return function() {
    // or use UserService
    return delay(60);
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
    HttpInterceptorsModule
  ],
  providers: [
    provideClientHydration(),
    {provide : APP_INITIALIZER, multi: true,  useFactory: loadCrucialData()}
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
