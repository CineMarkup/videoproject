import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Video-gallery } from '../video-gallery/video-gallery.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  
  ngAfterViewInit() {}
 
  public signUp(): void {
    this.router.navigateByUrl('/register');
  }
}
