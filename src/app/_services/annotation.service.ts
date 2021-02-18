import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {v4 as uuid} from 'uuid';
import { Observable } from 'rxjs';
import { AnnotationModel } from 'src/_models/annotation-model';


@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  hostUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  annotations =  this.getAnnotations();

  getAnnotations(): any {
    return this.http.get( this.hostUrl + 'annotation/all');
  }

  getAnnotationById(id: string): any {
    return this.http.get( this.hostUrl + 'annotation/' + id )
    .map(response => response as AnnotationModel);
  }

//   sortAnnotation(): void {
//     if (this.annotations) {
//         this.annotations.sort((a, b) => {
//             return a.startTime < b.startTime ? -1 : a.startTime;
//         });
//     }
//     console.log( this.annotations );
//   }

//   getMainAnnotation(): Promise<any> {
//       return new Promise(resolve => {
//           if (this.annotations) {
//               resolve(this.annotations.find(annotation => annotation.isMain));
//           } else {
//               resolve('');
//           }
//       });
//   }

//   addAnnotation(annotation: AnnotationModel): Promise<any> {
//     // @ts-ignore
//     return new Promise(resolve => {
//       annotation.annotationId = uuid();
//       this.annotations.push(annotation);
//       console.log('Width ' + annotation.width);
//       this.saveToStorage();
//       resolve('');
//     });
//   }

//   updateAnnotation(annotation: AnnotationModel): Promise<any> {
//     return new Promise((resolve, reject) => {
//         const index = this.annotations.findIndex(a => a.annotationId === annotation.annotationId);
//         if (index >= 0) {
//             this.annotations[index] = annotation;
//             this.saveToStorage();
//             resolve('');
//         } else {
//             reject('No video found with the id ' + annotation.annotationId);
//         }
//     });
//   }

//   deleteAnnotation(id: string): Promise<any> {
//     return new Promise<void>(resolve => {
//         const index = this.annotations.findIndex(video => video.annotationId === id);
//         this.annotations.splice(index, 1);

//         this.saveToStorage();
//         resolve();
//     });
//   }

//   saveToStorage(): void {
//       localStorage.setItem('playlist', JSON.stringify(this.annotations));
//   }

//   getFromStorage(): any {
//       const inStorage = localStorage.getItem('playlist');
//       if (inStorage) {
//           return JSON.parse(inStorage);
//       }
//   }


}
