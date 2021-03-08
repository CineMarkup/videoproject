import {Injectable} from '@angular/core';
import {VideoModel} from '../../_models/video-model';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {TagModel} from '../../_models/tag-model';
import {environment} from '../../environments/environment';


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

  // Http Headers for blobs
  // 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
  public httpOptionsBlobs = {
    headers: new HttpHeaders({
      'accept-encoding': 'gzip, deflate, br',
      connection: 'keep-alive',
      'Content-Type': 'multipart/form-data',
      'content-length': '1751477'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getVideos(): any {
    return this.http.get(this.hostUrl + 'video');
  }

  public getVideoById(id: string): any {
    return this.http.get(this.hostUrl + 'video/' + id)
      .map(response => response as VideoModel);
  }

  public postVideo(videoModel: VideoModel): Observable<any> {
    console.log(' video service postdata ');
    const started = Date.now();
    let ok: string;

    const formData = new FormData();
    // if (videoModel.file) {
    //   formData.append('file', videoModel.file);
    // }
    // if (videoModel.blob){
    //   formData.append('blob', videoModel.blob);
    // }

    formData.append('blob', videoModel.blob);
    // videoModel
    return this.http.post<VideoModel>(this.hostUrl + 'video', formData)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
          // Succeeds when there is a response; ignore other events
          // event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // // Operation failed; error is an HttpErrorResponse
          // error => ok = 'failed'
        ),
        finalize(() => {
          const elapsed = Date.now() - started;
          console.log('Message  ', ok , elapsed);
        })
      );
    // .pipe(
    //   catchError(this.handleError('postVideo', videoModel))
    // );
  }


  public addTag(videoID: string, tagID: string): Observable<any> {
    const body = {tags: tagID};
    const url = this.hostUrl + 'video/push/' + videoID;
    return this.http.put<VideoModel>(url, JSON.stringify(body), this.httpOptions)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  // tslint:disable-next-line:variable-name
  public addDescription(videoID: string, _description: string): Observable<any> {
    const body = {description: _description};
    const url = this.hostUrl + 'video/' + videoID;
    return this.http.put<VideoModel>(url, JSON.stringify(body), this.httpOptions)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public addTitle(videoID: string, titleToBeAdded: string): Observable<any> {
    const body = {title: titleToBeAdded};
    const url = this.hostUrl + 'video/' + videoID;
    return this.http.put<VideoModel>(url, JSON.stringify(body), this.httpOptions)
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  // tslint:disable-next-line:variable-name
  public addPublishedDate(videoID: string, _published: string) {
    const today = new Date().toString();
    const body = {published: _published, publishedAt: today};
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
