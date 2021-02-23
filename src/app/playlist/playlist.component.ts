import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { VideoModel } from '../../_models/video-model';
import { PlaylistService } from '../_services/playlist.service';
import { PlaylistModel } from '../../_models/playlist-model.';
import { AnnotationModel } from 'src/_models/annotation-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnnotationService } from '../_services/annotation.service';
import { VideoService } from '../_services/video.service';


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

  constructor(private playlistService: PlaylistService,
              private annotationService: AnnotationService,
              private videoService: VideoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
    this.getPlaylistData();
  }

  ngOnInit(): void {}

  private getPlaylistData() {
    this.route.params.subscribe(params => {
      this.playListId = params.id;
      if (this.playListId) {
        this.getPlaylistByID();
      }
      else {
        this.getPlaylists();
      }
    });
  }

  public addAnnotation(): void {
    this.router.navigate(['/annotation/'], { queryParams: {
      videoId: this.video.videoID, 
      annotationListID: this.playListId,
    }});
  }

  public onEndedAnnotation(): void {
    this.playNextAnnotation();
  }

  public onSeekVideo(seeked: any): void {
    this.playlist.annotations.forEach((clip, ind) => {
      if (seeked >= clip.startTime && seeked <=  clip.stopTime) {
        this.currentAnnotationIndex = ind;
        this.currentAnnotation = clip;
      }
    });
  }

  public onEditAnnotation(annotation: AnnotationModel): void {
     this.router.navigate(['/annotation/'], { queryParams: {
       annotationID: annotation.annotationID,
       videoId: this.video.videoID, 
       annotationListID: this.playListId
     }});
  }

  public onplayFromAnnotationStart(annotations: AnnotationModel, index: number): void {
    this.playAnnotation(index);
    this.videoCurrentTime = annotations.startTime;
  }

  public onDeleteAnnotation(annotationID: string): void {
    // remove from db
    this.annotationService.deleteAnnotation(annotationID)
      .subscribe((r) => { console.log(r); });
    this.annotationService.deleteAnnotationFromList(annotationID, this.playListId)
      .subscribe((r) => { console.log(r); });

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
    return 'assets/images/' + v;
  }

  public onSearch(event: any): void {
    this.playlist.annotations.forEach(annotation => {
      const filter = event.target.value.toUpperCase();
      const text = annotation.text;
      if (text.toUpperCase().indexOf(filter) > -1) {
        annotation.display = '';
      }
      else {
        annotation.display = 'none';
      }
    });
  }

  public publishVideo(videoID: string): void {
    this.videoService.addPublishedDate(videoID, "true");
    this.toastr.success('Your video is published');
  }

  private playAnnotation(index: number = 0): void {
    if (this.playlist.annotations && this.playlist.annotations.length > index) {
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
        }
        else {
          this.hasPlaylist = false;
        }
      },
      (err) => { console.log('ERROR ' + err); },
    );
  }

  private getPlaylists() {
    this.playlistService.getPlaylists().subscribe(
      result => {
        if (result) {
          this.playlists = result;
        }
      },
      (err) => { console.log('ERROR ' + err); },
    );
  }

  private sortAnnotations(): void {
    if (this.playlist) {
      this.playlist.annotations.sort((a, b) => {
            return a.startTime < b.startTime ? -1 : a.startTime;
        });
    }
  }

}
