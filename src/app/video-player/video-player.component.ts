import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, EventEmitter, Output, SimpleChanges, HostListener } from '@angular/core';
import { Options } from 'ng5-slider';
import { AnnotationModel } from 'src/_models/annotation-model';
import { VideoModel } from '../../_models/video-model';
import { environment } from '../../environments/environment';


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
  }

  get video(): VideoModel {
    return this._video;
  }

  // tslint:disable-next-line: variable-name
  _annotation: AnnotationModel;

  @Input()
  set annotation(v: AnnotationModel){
    this._annotation = v;
  }

  get annotation(): AnnotationModel {
    return this._annotation;
  }

  @Input() showAnnotation = false;

  @Input() autoplay = false;

  // tslint:disable-next-line: variable-name
  _currentTime = 0;

  @Input()
  set currentTime(v: number) {
    // changes the video player to start playing at the current time
    this._currentTime = v;
    if (this.video && this.loaded) {
      this.getNativeVideo().currentTime = this.currentTime;
    }
  }

  get currentTime(): number {
    return this._currentTime;
  }

  @Output() loadedMetaData: EventEmitter<VideoModel> = new EventEmitter();

  @Output() ended = new EventEmitter();

  @Output() seeked = new EventEmitter<{time: number}>();

  @Output() timeUpdated = new EventEmitter<{time: number}>();

  @ViewChild('videoplayer') videoplayer: ElementRef;

  public width = 200;

  public height = 75;

  public positionY = '10px';

  public positionX = '10px';

  private loaded = false;

  constructor(){ }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getNativeVideo().addEventListener('loadedmetadata', this.onLoadedMetaData.bind(this));
    this.getNativeVideo().addEventListener('timeupdate', this.onTimeUpdate.bind(this));
    this.getNativeVideo().addEventListener('ended', this.onEnded.bind(this));
    this.getNativeVideo().addEventListener('seeked', this.onSeek.bind(this));
  }

  /**
   * Get video URL with media fragments
   */
  public getVideoUrl(): any {
    return environment.apiUrl + this.video.url;
  }

  private playVideo(): void {
    this.getNativeVideo().play();
  }

  private onSeek(): void {
    const time = this.getNativeVideo().currentTime;
    this.seeked.emit(time);
  }

  private onLoadedMetaData(): void {
    const duration = this.getNativeVideo().duration;
    if (duration !== Number.POSITIVE_INFINITY){
      this.video.duration = duration;
    }
    this.setWidthAndHeight();
    this.setPosition();
    this.loaded = true;
    if (this.autoplay) {
      this.playVideo();
    }
    this.loadedMetaData.emit(this.video);
  }

  private onTimeUpdate(event): void {
    if (this.annotation) {
      this.setWidthAndHeight();
      this.setPosition();
      //since current time milliseconds rounds down use + 1
      if (this.annotation.stopTime && this.getNativeVideo().currentTime >= this.annotation.stopTime + 1) { 
        this.ended.emit('');
        this.showAnnotation = false;
      }
      else if ((this.annotation.startTime !== null) && this.getNativeVideo().currentTime >= this.annotation.startTime) {
        this.showAnnotation = true;
      }
      //Set time
      const time = this.getNativeVideo().currentTime;
      this.timeUpdated.emit(time);
    }
  }

  private setWidthAndHeight(): void {
    if (this.annotation) {
      if (this.annotation.width) {
        this.width = this.annotation.width;
      }
      if (this.annotation.height) {
        this.height = this.annotation.height;
      }
    }
  }

  private setPosition(): void {
    if (this.annotation) {
      if (typeof this.annotation.positionX !== 'undefined') {
        this.positionX = this.annotation.positionX + 'px';
      }
      if (typeof this.annotation.positionY !== 'undefined') {
        this.positionY = this.annotation.positionY + 'px';
      }
    }
  }

  // TODO Maybe make the annotation placement responsive based on video size
  // getVideoSize(): [number, number] {
  //   const v = this.getNativeVideo();
  //   const videoWidth = v.videoWidth;
  //   const videoHeight = v.videoHeight;
  //   return [videoWidth, videoHeight];
  // }

  private onEnded(): void {
    this.ended.emit('');
  }

  private getNativeVideo(): any {
    if (this.videoplayer) {
      return this.videoplayer.nativeElement;
    }
  }

}
