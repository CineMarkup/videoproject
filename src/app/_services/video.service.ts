import {Injectable} from '@angular/core';
import {VideoModel} from '../../_models/video-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

    constructor(private http: HttpClient) {}

    getVideos(): any {
        return this.http.get( this.hostUrl + 'video/all');
    }

    getVideoById(id: string): any {
        return this.http.get( this.hostUrl + 'video/' + id )
        .map(response => response as VideoModel);
    }
}
