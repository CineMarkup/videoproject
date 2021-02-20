import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {v4 as uuid} from 'uuid';
import { Observable } from 'rxjs';
import { AnnotationModel } from 'src/_models/annotation-model';
import { AnnotationListModel } from 'src/_models/annotation-list-model';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class AnnotationListService {
  hostUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getAllAnnotationLists(): any {
    return this.http.get( this.hostUrl + 'annotationlist' );
  }

  getAnnotationListById(id: string): any {
    return this.http.get( this.hostUrl + 'annotationlist/' + id )
    .map(response => response as AnnotationListModel);
  }


}
