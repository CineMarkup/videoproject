import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagModel } from 'src/_models/tag-model';
import { environment } from '../../environments/environment';


/**
 * User service gets user profile information
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  hostUrl = environment.apiUrl + 'app/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public withCreds = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  public getUsers(): any {
    return this.http.get( this.hostUrl + 'user');
  }

  public getId(): any {
    let printable = this.http.get( this.hostUrl + 'user/getid', this.withCreds);
    console.log('printable');
    return printable;
  }

  public getUserById(id: string): any {
    return this.http.get( this.hostUrl + 'user/' + id )
    .map(response => response as TagModel);
  }

}