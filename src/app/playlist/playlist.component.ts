import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VideoModel } from '../../_models/video-model';
import { PlaylistService } from '../_services/playlist.service';
import { PlaylistModel } from '../../_models/playlist-model.';
import { AnnotationModel } from 'src/_models/annotation-model';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Play a video along with the annotations
 */
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() editable = true;
  playlist: PlaylistModel;
  video: VideoModel;
  currentAnnotation: AnnotationModel;
  currentAnnotationIndex: number;
  hasPlaylist = false;
  annotations: any;
  videoCurrentTime = 0;
  playlists: Array<PlaylistModel>;

  constructor(private playlistService: PlaylistService,
              private route: ActivatedRoute,
              private router: Router) {

    this.route.params.subscribe(params => {
      const playListId = params.id;
      if (playListId) {
        this.playlistService.getPlaylistById(playListId).subscribe(
          result => {
            console.log('Test');
            console.log(result);
            if (result) {
              this.playlist = result;
              this.video = result.video;
              this.playAnnotation(0);
              this.hasPlaylist = true;
            }
            else {
              this.hasPlaylist = false;
            }
          },
          (err) => { console.log('ERROR ' + err); },
        );
      }
    });
  }

  ngOnInit(): void {}

  addAnnotation(): void {
    this.router.navigate(['/annotation/'], { queryParams: {
      videoId: this.video.videoID
    }});
  }

  playAnnotation(index: number = 0): void {
    if (this.playlist.annotations && this.playlist.annotations.length > index) {
      this.currentAnnotationIndex = index;
      this.currentAnnotation = this.playlist.annotations[index];
    }
  }

  playNextAnnotation(): void {
    if (this.playlist.annotations.length > (this.currentAnnotationIndex + 1)) {
      this.currentAnnotationIndex++;
      this.playAnnotation(this.currentAnnotationIndex);
    }
  }

  onEndedAnnotation(): void {
    this.playNextAnnotation();
  }

  onSeekVideo(seeked: any): void {
    this.playlist.annotations.forEach((clip, ind) => {
      if (seeked >= clip.startTime && seeked <=  clip.stopTime) {
        this.currentAnnotationIndex = ind;
        this.currentAnnotation = clip;
      }
    });
  }

  onEditAnnotation(annotation: AnnotationModel): void {
     this.router.navigate(['/annotation/'], { queryParams: {
       annotationId: annotation.annotationId,
       videoId: this.video.videoID
     }});
  }

  onplayFromAnnotationStart(annotations: AnnotationModel, index: number): void {
    this.playAnnotation(index);
    this.videoCurrentTime = annotations.startTime;
  }

  onDeleteAnnotation(annotation: AnnotationModel, index: number): void {
    // TODO connect to service call for deleting annotation
    // this.playlistService.deleteAnnotation(video.id).then(() => {
    //   this.playlistService.getPlaylist().then(playlist => {
    //     this.playlist = playlist;
    //   });
    // });
  }

  onSaveToStorage(): void {
    // TODO connect to service call for saving
    // this.playlistService.saveToStorage();
  }

}
