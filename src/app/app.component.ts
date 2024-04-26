import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'wind-front';

  constructor(private authService : AuthService) {
  }
  ngOnInit() {
    this.authService.autoLogin();
  }


}
