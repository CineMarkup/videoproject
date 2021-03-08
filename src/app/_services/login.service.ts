import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostUrl = environment.apiUrl + 'app/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }


  public getLogin(): any {
    return this.http.get(this.hostUrl + 'login');
  }

}
