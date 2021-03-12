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

  constructor(loginService: LoginService) {
    loginService.getLogin().subscribe(res => {
      this.loggedIn = true;
      this.email = res.email;
      this.name = res.displayName;
      this.avatar = res.avatar;
      /* ABOUT res fields:
        res.
          _id = mongodb id (BAD FORM TO USE THIS)
          userID = 'u192'
          googleID = 'numeric string I think'
          avatar = 'url'
          displayName = 'user chosen display name'
          email = 'string'
          userType = 'user'
      */
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
