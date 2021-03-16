import {Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {VideoModel} from '../../_models/video-model';
import {PlaylistService} from '../_services/playlist.service';
import {PlaylistModel} from '../../_models/playlist-model.';
import {AnnotationModel} from 'src/_models/annotation-model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AnnotationService} from '../_services/annotation.service';
import {VideoService} from '../_services/video.service';
import {AiService} from '../_services/ai.service';
import {F} from '@angular/cdk/keycodes';

/**
 * Play a video along with the annotations
 */
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements AfterViewInit {

  constructor(private playlistService: PlaylistService,
              private annotationService: AnnotationService,
              private videoService: VideoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private aiService: AiService) {
    this.getPlaylistData();
  }

  @Input() editable = true;

  public playlist: PlaylistModel;

  public video: VideoModel;

  public currentAnnotation: AnnotationModel;

  public currentAnnotationIndex: number;

  public hasPlaylist = false;

  public annotations: any;

  public videoCurrentTime = 0;

  public playlists: any;

  public searchText = '';

  public videoTags = [];

  public playListId = '';

  public timeLineBar = 0; // location of timeline bar

  public currentTime = 0;

  fileToUpload: File = null;

  public allowEditing = true;

  public annotationListId = '';

  ngAfterViewInit(): void {
  }

  private getPlaylistData() {
    if (this.router.url.split('/')[1] == 'view') {
      this.allowEditing = false;
    }
    this.route.params.subscribe(params => {
      this.playListId = params.id;
      if (this.playListId) {
        this.getPlaylistByID();
      } else {
        this.getPlaylists();
      }
    });
  }

  public addAnnotation(): void {
    this.router.navigate(['/annotation/'], {
      queryParams: {
        videoId: this.video.videoID,
        annotationListID: this.playListId,
      }
    });
  }

  public onEndedAnnotation(): void {
    this.playNextAnnotation();
  }

  public onSeekVideo(seeked: any): void {
    this.playlist.annotations.forEach((clip, ind) => {
      if (seeked >= clip.startTime && seeked <= clip.stopTime) {
        this.currentAnnotationIndex = ind;
        this.currentAnnotation = clip;
      }
    });
  }

  public onEditAnnotation(annotation: AnnotationModel): void {
    this.router.navigate(['/annotation/'], {
      queryParams: {
        annotationID: annotation.annotationID,
        videoId: this.video.videoID,
        annotationListID: this.playListId
      }
    });
  }

  public onplayFromAnnotationStart(annotations: AnnotationModel, index: number): void {
    this.playAnnotation(index);
    this.videoCurrentTime = annotations.startTime;
  }

  public onDeleteAnnotation(annotationID: string): void {
    // remove from db
    this.annotationService.deleteAnnotation(annotationID)
      .subscribe((r) => {
        console.log(r);
      });
    this.annotationService.deleteAnnotationFromList(annotationID, this.playListId)
      .subscribe((r) => {
        console.log(r);
      });

    // remove locally
    this.playlist.annotations.splice(
      this.playlist.annotations.findIndex(item => item.annotationID === annotationID), 1
    );
    this.toastr.success('Deleted annotation');
  }

  public editPlaylist(id: string): void {
    this.router.navigateByUrl('/playlist/' + id);
  }

  public getThumbnail(v: any): string {
    if (v.thumbnail) {
      return 'assets/images/' + v.thumbnail;
    } else {
      return 'assets/images/Default.PNG';
    }
  }

  public getDescription(video: any): string {
    if (video.description) {
      return video.description;
    } else {
      return 'Make sure to add a description to help users better understand your content.';
    }
  }

  public onSearch(event: any): void {
    this.playlist.annotations.forEach(annotation => {
      const filter = event.target.value.toUpperCase();
      const text = annotation.text;
      if (text.toUpperCase().indexOf(filter) > -1) {
        annotation.display = '';
      } else {
        annotation.display = 'none';
      }
    });
  }

  public saveVideo(event: Event): void {
    let fileList = [];
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
      // @ts-ignore
      fileList = event.target.files;
    }
    this.fileToUpload = fileList[0];

    const filesize = ((this.fileToUpload.size / 1024) / 1024).toFixed(4); // MB
    // tslint:disable-next-line:radix
    if (parseInt(filesize) > 200) {
      alert('too big to upload');
    }

    // TODO calculate duration

    const formData = new FormData();
    // const duration = this.fileToUpload.getVideoDuration();
    formData.append('url', this.fileToUpload);
    formData.append('title', this.fileToUpload.name);
    // formData.append('duration', duration.toString());
    formData.append('fileName', this.fileToUpload.name);
    formData.append('createdBy', this.getCurrentUser());
    const response = this.videoService.postVideo(formData);
    response.subscribe((res) => {
      this.annotationListId = res.annotationListID;
      this.toastr.success('Your video is saved');
      // this.router.navigateByUrl('/playlist/' + this.annotationListId + '?new=true');
      this.router.navigate(['/playlist/' + this.annotationListId], {queryParams: {new: true}});
    });
  }

  public publishVideo(videoID: string): void {
    this.videoService.addPublishedDate(videoID, 'true');
    this.toastr.success('Your video is published');
  }

  public unPublishVideo(videoID: string): void {
    this.videoService.addPublishedDate(videoID, 'false');
    this.toastr.success('Your video was un-published');
  }

  public highlightAnnotation(annotation: AnnotationModel): boolean {
    const stopTime = Math.round(annotation.stopTime) + 1;
    if ((this.currentTime < annotation.startTime || this.currentTime > stopTime)
      && annotation.annotationID == this.currentAnnotation.annotationID) {
      console.log(this.currentTime + ' ' + annotation.stopTime);
      return false;
      // tslint:disable-next-line:triple-equals
    } else if (annotation.annotationID == this.currentAnnotation.annotationID) {
      return true;
    }
  }

  public isCurrentUser(user: any): boolean {
    // TODO check if user once authentication is complete with google auth
    if (user.userID === 'u5') {
      return true;
    } else {
      return false;
    }
  }

  public save(): void {
    const value = this.playlist.video.description;
    // add description
    const response = this.videoService.addDescription(this.video.videoID, value.trim());
    response.subscribe((r) => {
      console.log(r);
    });
  }

  public removeDescription(): void {
    this.playlist.video.description = '';
  }


  private getCurrentUser(): any {
    // TODO get user from login
    return 'u5';
  }

  private playAnnotation(index: number = 0): void {
    if (this.playlist.annotations && this.playlist.annotations.length > index
    ) {
      this.currentAnnotationIndex = index;
      this.currentAnnotation = this.playlist.annotations[index];
    }
  }

  private playNextAnnotation(): void {
    if (this.playlist.annotations.length > (this.currentAnnotationIndex + 1)) {
      this.currentAnnotationIndex++;
      this.playAnnotation(this.currentAnnotationIndex);
    }
  }

  private getPlaylistByID() {
    this.playlistService.getPlaylistById(this.playListId).subscribe(
      result => {
        if (result) {
          this.playlist = result;
          this.video = result.video;
          this.videoTags = result.video.tags;
          this.playAnnotation(0);
          this.hasPlaylist = true;
          this.sortAnnotations();
          this.getPositionAndOffset();
        } else {
          this.hasPlaylist = false;
        }
      },
      (err) => {
        console.log('ERROR ' + err);
      },
    );
  }

  private getPlaylists() {
    this.playlistService.getPlaylists().subscribe(
      result => {
        if (result) {
          this.playlists = result;
        }
      },
      (err) => {
        console.log('ERROR ' + err);
      },
    );
  }

  private sortAnnotations(): void {
    if (this.playlist
    ) {
      this.playlist.annotations.sort((a, b) => {
        return a.startTime < b.startTime ? -1 : a.startTime;
      });
    }
  }

// Timeline
  public getSizeFromTime(annotation: any) {
    return annotation.timelineWidth * 100;
  }

  public getPositionFromTime(annotation: any) {
    const start = annotation.startTime;
    const offset = annotation.timelineOffset;
    const total = this.video.duration as number;
    if (offset === 0) {
      return 0;
    } else {
      return ((start / total) * 100) - (offset * 100);
    }
  }

  private getPositionAndOffset(): void {
    if (this.playlist) {
      let totalWidth = 0;
      let lastStopTime = -1;
      this.playlist.annotations.forEach((annotation) => {
        if (lastStopTime === annotation.startTime) {
          annotation.timelineOffset = 0;
          annotation.timelineWidth = this.getWidth(annotation, 0);
        } else {
          annotation.timelineOffset = totalWidth;
          annotation.timelineWidth = this.getWidth(annotation, 1);
        }
        lastStopTime = annotation.stopTime;
        totalWidth += annotation.timelineWidth;
      });
      if (totalWidth >= 1) {
        const annotation = this.playlist.annotations[0];
        this.playlist.annotations[0].timelineWidth = this.getWidth(annotation, 0);
      }
    }
  }

  private getWidth(annotation: any, addition: number): number {
    const start = annotation.startTime;
    const stop = annotation.stopTime;
    const total = this.video.duration as number;
    return ((stop - start + addition) / total);
  }

  public onTimeProgress(timeUpdate: any): void {
    const total = this.video.duration;
    this.timeLineBar = (timeUpdate / total) * 100;
    this.currentTime = timeUpdate;
  }

  public upload(): void {
    // TODO: complete the post and validate
    console.log('----------------:upload');
    // // TBD - upload video
    // const obj = {
    //   videofile: '',
    //   title:'' ,
    //   description: ''
    // };
    // this.videoService.postVideo(obj);
  }

}
