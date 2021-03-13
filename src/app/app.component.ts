import {Component} from '@angular/core';
import {LoginService} from '../app/_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'videoproject';
  loggedIn = false;
  email: any = 'anon@gmail.com';
  name: any = 'Logged-in';

  constructor() {
  }
}
