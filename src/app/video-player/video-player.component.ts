import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Options } from 'ng5-slider';
import { VideoModel } from '../../_models/video-model';

/**
 * Just plays a video
 */
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line: variable-name
  _video: VideoModel;

  @Input()
  set video(v: VideoModel){
    this._video = v;
    if (this.getNativeVideo()){
      this.getNativeVideo().load();
    }
  }
  get video(): VideoModel {
    return this._video;
  }

  @Input() showTitle = false;
  @Input() autoplay = false;

  @Output() loadedMetaData: EventEmitter<VideoModel> = new EventEmitter();
  // tslint:disable-next-line: no-output-native
  @Output() ended = new EventEmitter();

  @ViewChild('videoplayer') videoplayer: ElementRef;

  loaded = false;

  constructor(){ }
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getNativeVideo().addEventListener('loadedmetadata', this.onLoadedMetaData.bind(this));
    this.getNativeVideo().addEventListener('timeupdate', this.onTimeUpdate.bind(this));
    this.getNativeVideo().addEventListener('ended', this.onEnded.bind(this));
  }

  playVideo(): void {
    /**
     * You are accessing a dom element directly here,
     * so you need to call "nativeElement" first.
     */
    this.getNativeVideo().play();
  }

  onLoadedMetaData(): void {
    this.video.duration = this.getNativeVideo().duration;
    this.loaded = true;
    if (this.autoplay) {
      this.playVideo();
    }
    this.loadedMetaData.emit(this.video);
  }

  onTimeUpdate(event): void {
    if (this.video.end && this.getNativeVideo().currentTime >= this.video.end){
      this.ended.emit('');
    }
  }

  onEnded(): void {
    this.ended.emit('');
  }

  /**
   * Get video URL with media fragments
   *
   */
  getVideoUrl(): any {
    let url = this.video.url;
    if (this.video.start) {
      url += '#t=' + this.video.start;
      if (this.video.end){
        url += ',' + this.video.end;
      }
    }
    return url;
  }

  getNativeVideo(): any {
    if (this.videoplayer) {
      return this.videoplayer.nativeElement;
    }
  }

}
