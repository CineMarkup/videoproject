import {Injectable} from '@angular/core';
import {VideoModel} from '../../_models/video-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


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
    hostUrl = 'http://localhost:8080/';
    video: any;

    // Http Headers
    public httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {}

    getVideos(): any {
        return this.http.get( this.hostUrl + 'video');
    }

    getVideoById(id: string): any {
        return this.http.get( this.hostUrl + 'video/' + id )
        .map(response => response as VideoModel);
    }

    pushTag(videoID: string, tagID: string): Observable<any> {
        const body = { 'tags': tagID };
        const url = this.hostUrl + 'video/push/' + videoID;
        console.log(body);
        console.log(url);
        return this.http.put<VideoModel>(url, JSON.stringify(body), this.httpOptions)
        .pipe(
          tap(
            data => console.log(data),
            error => console.log(error)
          )
        );
    }

}
