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
import { UserModel } from 'src/_models/user-model';
import { UserService } from './user.service';
import { CommentModel } from 'src/_models/comment-model';


/**
 * Playlist service is a parent service that relies on the
 * annotation list, annotations, videos, and user service to
 * combine the information for the playlist.
 */
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlists: Array<PlaylistModel> = []; // all playlists

  playlist: PlaylistModel; // individual playlist

  annotationAndVids: any;

  constructor(private annotationList: AnnotationListService,
              private annotations: AnnotationService,
              private videos: VideoService,
              private users: UserService) {

  }

  public getPlaylistById(annotationListId: string): Observable<any> {

    const annotationList: Promise<AnnotationListModel> = this.annotationList.getAnnotationListById(annotationListId);
    const videos: Promise<Array<VideoModel>> = this.videos.getVideos();
    const annotations: Promise<Array<AnnotationModel>> = this.annotations.getAnnotations();
    const users: Promise<Array<UserModel>> = this.users.getUsers();

    // tslint:disable-next-line: deprecation
    return Observable.forkJoin(annotationList, videos, annotations, users)
       .map((results) => {
          const item: AnnotationListModel = results[0];
          const id = item.id;
          const annotationLists = item.annotationList;
          const video = results[1].find(v => v.videoID === item.videoID);
          video.duration = video.duration as number;
          const user = results[3].find(v => v.userID === video.createdBy);
          const comments = video.comments;
          comments.forEach((comment: CommentModel) => {
            const commentUser = results[3].find(v => v.userID === comment.createdBy);
            comment.user = commentUser;
            comment.isPlaying = false;
          })
          const value = {
            id,
            video,
            annotations: [],
            user,
            comments
          };
          annotationLists.forEach((annotationID) => {
            const annotation = results[2].find(a => a.annotationID === annotationID);
            value.annotations.push(annotation);
          });
          this.playlist = value;
          return this.playlist;
       });
  }

  public getPlaylists(): Observable<any> {

    const annotationList: Promise<Array<AnnotationListModel>> = this.annotationList.getAllAnnotationLists();
    const videos: Promise<Array<VideoModel>> = this.videos.getVideos();
    const annotations: Promise<Array<AnnotationModel>> = this.annotations.getAnnotations();
    const users: Promise<Array<UserModel>> = this.users.getUsers();
  
    // tslint:disable-next-line: deprecation
    return Observable.forkJoin([annotationList, videos, annotations, users]).map(
       (results) => {
         const playlists = [];
         results[0].map(item => {
            this.annotationAndVids = item;
            const id = item.id;
            const annotationLists = item.annotationList;
            const video = results[1].find(v => v.videoID === item.videoID);
            const user = results[3].find(v => v.userID === video.createdBy);
            const comments = video.comments;
            comments.forEach((comment: CommentModel) => {
              const commentUser = results[3].find(v => v.userID === comment.createdBy);
              comment.user = commentUser;
            })
            const urlRoute = video.url;
            video.url = urlRoute;

            const value = {
              id,
              video,
              annotations: [],
              user,
              comments,
            };
            annotationLists.map((annotationID) => {
              const annotation = results[2].find(a => a.annotationID === annotationID);
              value.annotations.push(annotation);
            });
            playlists.push(value);
         });
         return playlists;
       });
  }

  public getPlaylistsforAuthenticatedUser(): Observable<any> {

    const annotationList: Promise<Array<AnnotationListModel>> = this.annotationList.getAllAnnotationLists();
    const videos: Promise<Array<VideoModel>> = this.videos.getUserVideos();
    const annotations: Promise<Array<AnnotationModel>> = this.annotations.getAnnotations();
    const users: Promise<Array<UserModel>> = this.users.getUsers();
  
    // tslint:disable-next-line: deprecation
    return Observable.forkJoin([annotationList, videos, annotations, users]).map(
       (results) => {
         const playlists = [];
         results[0].map(item => {
            this.annotationAndVids = item;
            const id = item.id;
            const annotationLists = item.annotationList;
            const video = results[1].find(v => v.videoID === item.videoID);
            if (video) {
              const user = results[3].find(v => v.userID === video.createdBy);
              const comments = video.comments;
              comments.forEach((comment: CommentModel) => {
                const commentUser = results[3].find(v => v.userID === comment.createdBy);
                comment.user = commentUser;
              })
              const urlRoute = video.url;
              video.url = urlRoute;

              const value = {
                id,
                video,
                annotations: [],
                user,
                comments,
              };
              annotationLists.map((annotationID) => {
                const annotation = results[2].find(a => a.annotationID === annotationID);
                value.annotations.push(annotation);
              });
              playlists.push(value);
            }
         });
         console.log("Results");
         console.log(playlists);
         return playlists;
       });
  }

  public getVideos(): Observable<any> {
    const videos: Promise<Array<VideoModel>> = this.videos.getVideos();
    const users: Promise<Array<UserModel>> = this.users.getUsers();
  
    // tslint:disable-next-line: deprecation
    return Observable.forkJoin([videos, users]).map(
       (results) => {
         const playlist = [];

         results[0].map(video => {
            const id = 0;
            const user = results[1].find(v => v.userID === video.createdBy);
            const value = {
              id,
              video,
              annotations: [],
              user
            };
            playlist.push(value);
            
         });
         return playlist;
       });
  }

}
