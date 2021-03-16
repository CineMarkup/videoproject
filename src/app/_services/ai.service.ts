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
  cognitiveURL = environment.cognitiveServer;

  // Http Headers
  public httpOptionsFormData = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getThumbnail(videodata): Observable<any> {
    console.log(' videodata : --------', videodata);
    return this.http.post(this.cognitiveURL + 'video/thumbnail', videodata);
  }

  public getSnapshot(videodata): Observable<any> {
    const url = this.cognitiveURL + 'video/snapshot';
    return this.http.post(url, videodata, { responseType: 'blob' });
    // fetch(url, {method: 'POST'}, videodata)
    //   .then(re => re.blob())
    //   .then(blob => URL.createObjectURL(blob))
    //   .then(url => {
    //     return url;
    //   }).catch(err => {
    //   console.log(err);
    // });
  }

  public getTags(imagedata): Observable<any> {
    const url = this.cognitiveURL + 'image/tags';
    return this.http.post(url, imagedata,{ responseType: 'text' });
  }
}
