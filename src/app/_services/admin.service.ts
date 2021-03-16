import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient,  HttpHeaders } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  hostUrl = environment.apiUrl + 'app/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  public getCounts(): any {
    return this.http.get(this.hostUrl + 'admin/counts', this.httpOptions);
  }

  public getUsers(): any {
    return this.http.get(this.hostUrl + 'admin/users', this.httpOptions);
  }

}
