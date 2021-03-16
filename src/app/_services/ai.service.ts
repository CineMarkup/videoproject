import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  hostUrl = environment.apiUrl + 'app/';
  cognitiveURL = environment.cognitiveServer + '/';

  // Http Headers
  public httpOptionsFormData = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getThumbnail(videodata): Observable<any> {
    return this.http.post(this.cognitiveURL + 'video/thumbnail', this.httpOptionsFormData, videodata)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public getSnapshot(videodata): Observable<any> {
    return this.http.post(this.cognitiveURL + 'video/snapshot', this.httpOptionsFormData, videodata)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public getTags(imagedata): Observable<any> {
    return this.http.post(this.cognitiveURL + 'image/tags', this.httpOptionsFormData, imagedata)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }
}
