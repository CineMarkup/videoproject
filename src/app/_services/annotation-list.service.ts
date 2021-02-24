import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnotationModel } from 'src/_models/annotation-model';
import { AnnotationListModel } from 'src/_models/annotation-list-model';
import 'rxjs/add/operator/map';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AnnotationListService {

  hostUrl = 'http://localhost:8080/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  public getAllAnnotationLists(): any {
    return this.http.get( this.hostUrl + 'annotationlist' );
  }

  public getAnnotationListById(id: string): any {
    return this.http.get( this.hostUrl + 'annotationlist/' + id )
    .map(response => response as AnnotationListModel);
  }

  public addAnnotationToList(id: string, data): Observable<any> {
    return this.http.put<AnnotationListModel>(this.hostUrl + 'annotationlist/push/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

}
