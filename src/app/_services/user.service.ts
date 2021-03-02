import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TagModel } from 'src/_models/tag-model';
import { errorHandler } from './utilities';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


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

  constructor(private http: HttpClient) {}

  public getUsers(): any {
    return this.http.get( this.hostUrl + 'user');
  }

  public getUserById(id: string): any {
    return this.http.get( this.hostUrl + 'user/' + id )
    .map(response => response as TagModel);
  }

}