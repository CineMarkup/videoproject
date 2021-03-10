import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient,  HttpHeaders } from '@angular/common/http';


/**
 * Login service gets the credentials relying on single sine on from the server.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostUrl = environment.apiUrl + 'app/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {
  }

  public getLogin(): any {
    return this.http.get(this.hostUrl + 'auth/loginstatus', this.httpOptions);
  }

}
