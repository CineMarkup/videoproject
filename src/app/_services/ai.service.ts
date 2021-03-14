import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  hostUrl = environment.apiUrl + 'app/';
  cognitiveURL = environment.cognitiveServer;

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  public getThumbnail(): any {
    return this.http.get(this.cognitiveURL + 'thumbnail', this.httpOptions);
  }

  public getTags(): any {
    return this.http.get(this.cognitiveURL + 'thumbnail', this.httpOptions);
  }

  public getDescription(): any {
    return this.http.get(this.cognitiveURL + 'thumbnail', this.httpOptions);
  }

}
