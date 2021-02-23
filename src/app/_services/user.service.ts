import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TagModel } from 'src/_models/tag-model';
import { errorHandler } from './utilities';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  hostUrl = 'http://localhost:8080/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getUsers(): any {
    return this.http.get( this.hostUrl + 'user');
  }

  getUserById(id: string): any {
    return this.http.get( this.hostUrl + 'user/' + id )
    .map(response => response as TagModel);
  }

}