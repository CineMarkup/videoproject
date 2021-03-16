import {Injectable} from '@angular/core';
import {VideoModel} from '../../_models/video-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AiService} from './ai.service';

/**
 * Video service gets and posts videos and edits their attributes
 */
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  hostUrl = environment.apiUrl + 'app/';

  // Http Headers
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public httpOptionsFormData = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };


  constructor(private http: HttpClient, private aiService: AiService) {
  }

  public getVideos(): any {
    return this.http.get<Array<VideoModel>>(this.hostUrl + 'video');
  }

  public getVideoData(url: string): any {
    // return this.http.get(url, {'mode': 'no-cors'});
    fetch(url)
      .then((data) => data.blob())
      .then(url => {
        console.log('Video data returned from azure service');
        const formData = new FormData();
        formData.append('video', url);
        this.aiService.getSnapshot(formData)
          .subscribe((imageres) => {
            console.log('imageres', imageres);
            // imageres.blob().then(iurl=>{
            // });
            const formDataImage = new FormData();
            formDataImage.append('image', imageres);
            const airesponse = this.aiService.getTags(formDataImage);
            airesponse.subscribe((tags) => {
              return tags;
            });
          });
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
      });
  }

  public getUserVideos(): any {
    return this.http.get<Array<VideoModel>>(this.hostUrl + 'videos/user');
  }

  public getVideoById(id: string): any {
    return this.http.get<VideoModel>(this.hostUrl + 'video/' + id)
      .map(response => response);
  }

  public addTag(videoID: string, tagID: string): Observable<any> {
    const body = {'tags': tagID};
    const url = this.hostUrl + 'video/push/' + videoID;
    return this.http.put<VideoModel>(url, JSON.stringify(body), this.httpOptions)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public addDescription(videoID: string, description: string): Observable<any> {
    const body = {'description': description};
    const url = this.hostUrl + 'video/' + videoID;
    return this.http.put<VideoModel>(url, JSON.stringify(body), this.httpOptions)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public addTitle(videoID: string, title: string): Observable<any> {
    const body = {'title': title};
    const url = this.hostUrl + 'video/' + videoID;
    return this.http.put<VideoModel>(url, JSON.stringify(body), this.httpOptions)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public addPublishedDate(videoID: string, published: string) {
    const today = new Date().toString();
    const body = {'published': published, 'publishedAt': today};
    const url = this.hostUrl + 'video/' + videoID;
    return this.http.put<any>(url, JSON.stringify(body), this.httpOptions)
      .subscribe((r) => {
        console.log(r);
      });
  }

  public deleteTagFromList(videoID: string, tagID: string): Observable<any> {
    const url = this.hostUrl + 'video/' + videoID + '/remove/' + tagID;
    return this.http.put<VideoModel>(url, {}, this.httpOptions)
      .pipe(
        tap(
          data => console.log(data),
          error => console.error(error)
        )
      );
  }

  public postVideo(data): Observable<any> {
    const url = this.hostUrl + 'video';
    return this.http.post<VideoModel>(url, data)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

}
