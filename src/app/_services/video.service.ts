import {Injectable} from '@angular/core';
import {VideoModel} from '../../_models/video-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
/**
 * Video service...
 *
 * IMPORTANT: Promise in each method are added to simulate server side processing
 * Uses LocalStorage
 *
 *
 */
export class VideoService {

  hostUrl = environment.apiUrl + 'app/';

    // Http Headers
    public httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {}

    public getVideos(): any {
        return this.http.get( this.hostUrl + 'video');
    }

    public getVideoById(id: string): any {
        return this.http.get( this.hostUrl + 'video/' + id )
        .map(response => response as VideoModel);
    }

    public addTag(videoID: string, tagID: string): Observable<any> {
        const body = { 'tags': tagID };
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
        const body = { 'description': description };
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
        const body = { 'title': title };
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
        const body = { 'published': published, 'publishedAt': today };
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

}
