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
export class TagService {
  hostUrl = 'http://localhost:8080/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getTags(): any {
    return this.http.get( this.hostUrl + 'tag/all');
  }

  getTagById(id: string): any {
    return this.http.get( this.hostUrl + 'tag/' + id )
    .map(response => response as TagModel);
  }

  postTag(data): Observable<any> {
    return this.http.post<TagModel>(this.hostUrl + 'tag', JSON.stringify(data), this.httpOptions)
    .pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

}
