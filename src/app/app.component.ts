import {Component} from '@angular/core';
// import { userInfo } from 'os';
import {LoginService} from '../app/_services/login.service';
import { UserService } from './_services/user.service';

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
  avatar: any = 'default';
  userType: any = 'user';
  
  constructor(loginService: LoginService) {
    loginService.getLogin().subscribe(res => {
      this.loggedIn = true;
      this.email = res.email;
      this.name = res.displayName;
      this.avatar = res.avatar;
      this.userType = res.userType;
    },
    error => {
      // server sends back 403 on unauthenticated getLogin()
      if (error.status == 403) {
        this.loggedIn = false;
      }
    }
    );
  }

  // BACKLOG: placeholder stub. Currently does nothing.
  public logout() {
    this.loggedIn = false;
  }
}
