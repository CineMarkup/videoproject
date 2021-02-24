import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagModel } from 'src/_models/tag-model';
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

  public getTags(): any {
    return this.http.get( this.hostUrl + 'tag/all');
  }

  public getTagById(id: string): any {
    return this.http.get( this.hostUrl + 'tag/' + id )
    .map(response => response as TagModel);
  }

  public postTag(data): Observable<any> {
    return this.http.post<TagModel>(this.hostUrl + 'tag', JSON.stringify(data), this.httpOptions)
    .pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

  public deleteTag(tagID: string): Observable<any> {
    return this.http.delete<TagModel>(this.hostUrl + 'tag/' + tagID)
    .pipe(
      tap(
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

}
