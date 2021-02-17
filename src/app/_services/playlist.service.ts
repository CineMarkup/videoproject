import { Injectable } from '@angular/core';
import { AnnotationModel } from 'src/_models/annotation-model';
import { PlaylistModel } from 'src/_models/playlist-model.';
import { AnnotationListService } from './annotation-list.service';
import { AnnotationService } from './annotation.service';
import { VideoService } from './video.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip';
import { AnnotationListModel } from 'src/_models/annotation-list-model';
import { VideoModel } from 'src/_models/video-model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlists: Array<PlaylistModel> = []; // all playlists

  playlist: PlaylistModel; // individual playlist

  annotationAndVids: any;

  constructor(private annotationList: AnnotationListService,
              private annotations: AnnotationService,
              private videos: VideoService) {

  }

  getPlaylistById(annotationListId: string): Observable<any> {

    const annotationList: Promise<AnnotationListModel> = this.annotationList.getAnnotationListById(annotationListId);
    const videos: Promise<Array<VideoModel>> = this.videos.getVideos();
    const annotations: Promise<Array<AnnotationModel>> = this.annotations.getAnnotations();

    // tslint:disable-next-line: deprecation
    return Observable.forkJoin(annotationList, videos, annotations)
       .map((results) => {
          const item: AnnotationListModel = results[0];
          const id = item.id;
          const annotationLists = item.annotationList;
          const video = results[1].find(v => v.videoID === item.videoID);
          const value = {
            id,
            video,
            annotations: []
          };
          annotationLists.forEach((annotationId) => {
            const annotation = results[2].find(a => a.annotationId === annotationId);
            value.annotations.push(annotation);
          });
          this.playlist = value;
          console.log(value);
          return this.playlist;
       });
  }

  getPlaylists(): Observable<any> {

    const annotationList: Promise<Array<AnnotationListModel>> = this.annotationList.getAllAnnotationLists();
    const videos: Promise<Array<VideoModel>> = this.videos.getVideos();
    const annotations: Promise<Array<AnnotationModel>> = this.annotations.getAnnotations();

    // tslint:disable-next-line: deprecation
    return Observable.forkJoin([annotationList, videos, annotations]).map(
       (results) => {
         const playlists = [];
         results[0].map(item => {
            this.annotationAndVids = item;
            const id = item.id;
            const annotationLists = item.annotationList;
            const video = results[1].find(v => v.videoID === item.videoID);
            const value = {
              id,
              video,
              annotations: []
            };
            annotationLists.map((annotationId) => {
              const annotation = results[2].find(a => a.annotationId === annotationId);
              value.annotations.push(annotation);
            });
            playlists.push(value);
         });
         console.log(playlists);
         return playlists;
       });
  }

}
