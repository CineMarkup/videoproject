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

  // annotationList: Array<AnnotationListModel> = [{
  //     id: 'aL1',
  //     videoID: 'v1',
  //     annotationList: ['a1', 'a2', 'a3'],
  //   },
  //   {
  //     id: 'aL2',
  //     videoID: 'v2',
  //     annotationList: ['a3'],
  //   },
  // ];

  constructor(private http: HttpClient) {}

  getAllAnnotationLists(): any {
    return this.http.get( this.hostUrl + 'annotation/all' );
  }

  getAnnotationListById(id: string): any {
    return this.http.get( this.hostUrl + 'annotationlist/' + id )
    .map(response => response as AnnotationListModel);
  }

  // getAnnotationList(): Promise<Array<AnnotationListModel>> {
  //   return new Promise(resolve => {
  //       resolve(this.annotationList);
  //   });
  // }

  // getAnnotationListById(id): Promise<AnnotationListModel> {
  //   return new Promise(resolve => {
  //     if (!this.annotationList) {
  //       this.getAnnotationList().then( () => {
  //         resolve(this.annotationList.find(p => p.id === id));
  //       });
  //     } else {
  //       resolve(this.annotationList.find(p => p.id === id));
  //     }
  //   });
  // }


}
