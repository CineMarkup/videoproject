import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { UserModel } from '../../_models/user-model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public userCount: any;
  public projectCount: any;
  public videoCount: any;
  public tagCount: any;
  public annotationListCount: any;
  public annotationCount: any;

  public users: any;

  constructor(private adminService : AdminService) {
    this.getCounts();
    this.getUsers();
  }

  ngOnInit(): void {
  }

  public getCounts() {
    this.adminService.getCounts().subscribe( res => {
      this.userCount = res.userCount;
      this.projectCount = res.projectCount;
      this.videoCount = res.videoCount;
      this.tagCount = res.tagCount;
      this.annotationListCount = res.annotationListCount;
      this.annotationCount = res.annotationCount;
      console.log('projectCount', this.projectCount, res.projectCount);
    }, 
    error => {
      console.log(error);
      console.log("Error returning admin count");
    });
  }

  public getUsers() {
    this.adminService.getUsers().subscribe( res => {
      console.log(res);
      this.users = res;
    },
    error => {
      console.log(error);
      console.log('Error returning list of users')
    }
    );
  }

}