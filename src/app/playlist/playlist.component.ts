import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from '../../_models/video-model';
import { VideoService } from '../video.service';
import { PlaylistModel } from '../../_models/playlist-model.';
import { Router } from '@angular/router';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

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
  currentVideo: VideoModel;
  currentVideoIndex: number;
  hasPlaylist = false;

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.videoService.getPlaylist().then((playlist) => {
      if (playlist && playlist.playlistVideos.length > 0) {
        console.log(playlist);
        this.playlist = playlist;
        this.playVideo(0);
        this.hasPlaylist = true;
      } else {
        this.hasPlaylist = false;
      }
    });
  }

  addMainVideo(): void {
    this.router.navigateByUrl('/main-video');
  }

  addClip(): void {
    this.router.navigateByUrl('/video');
  }

  playVideo(index: number = 0): void {
    if (this.playlist.playlistVideos && this.playlist.playlistVideos.length > index) {
      console.log(this.playlist);
      this.currentVideoIndex = index;
      this.currentVideo = this.playlist.playlistVideos[index];
    }
  }

  onEndedVideo(): void {
      this.playNextVideo();
  }

  playNextVideo(): void {
    if (this.playlist.playlistVideos.length > (this.currentVideoIndex + 1)) {
      this.currentVideoIndex++;
      this.playVideo(this.currentVideoIndex);
    }
  }
  playPreviusVideo(): void {
    if (this.currentVideoIndex - 1 >= 0){
      this.currentVideoIndex--;
      this.playVideo(this.currentVideoIndex);
    }
  }

  onEditVideo(video: VideoModel): void {
     this.router.navigateByUrl('/video/' + video.id);
  }

  onDeleteVideo(video: VideoModel, index: number): void{
    this.videoService.deleteVideo(video.id).then(() => {
      this.videoService.getPlaylist().then(playlist => {
        this.playlist = playlist;
      });
    });
  }

  onPlayThisVideo(video: VideoModel, index: number): void {
    this.playVideo(index);
  }

  onSaveToStorage(): void {
    this.videoService.saveToStorage();
  }

}
