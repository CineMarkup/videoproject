import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn: AppComponent['loggedIn'];

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  public signUp(): void {
    this.router.navigateByUrl('/register');
  }

  public saveVideo(event: Event): void {

  }
}
