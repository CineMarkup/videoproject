import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnotationModel } from 'src/_models/annotation-model';
import { tap } from 'rxjs/operators';
import { AnnotationListModel } from 'src/_models/annotation-list-model';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  hostUrl = 'http://localhost:8080/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  public getAnnotations(): any {
    return this.http.get( this.hostUrl + 'annotation');
  }

  public getAnnotationById(id: string): any {
    return this.http.get( this.hostUrl + 'annotation/' + id )
    .map(response => response as AnnotationModel);
  }

  public postAnnotation(data): Observable<any> {
    return this.http.post<AnnotationModel>(this.hostUrl + 'annotation', JSON.stringify(data), this.httpOptions)
    .pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

  public putAnnotation(annotationID: string, body: any): Observable<any> {
    const url = this.hostUrl + 'annotation/' + annotationID;
    return this.http.put<AnnotationModel>(url, JSON.stringify(body), this.httpOptions)
    .pipe(
      tap(
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  public deleteAnnotation(annotationID: string): Observable<any> {
    const url = this.hostUrl + 'annotation/' + annotationID;
    return this.http.delete<AnnotationModel>(url)
    .pipe(
      tap(
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  public deleteAnnotationFromList(annotationID: string, annotationListID: string): Observable<any> {
    const url = this.hostUrl + 'annotationlist/' + annotationListID + '/remove/' + annotationID;
    return this.http.put<AnnotationListModel>(url, {}, this.httpOptions)
    .pipe(
      tap(
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

}
