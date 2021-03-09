import { VideoService } from './../_services/video.service';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { ToastrService } from 'ngx-toastr';

/**
 * Records a video
 */
@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements AfterViewInit {

  /*
    Public
  */
  public audioDevices: {name: string, id: string}[] = [];

  public audioDeviceId: string | undefined;

  public blob: Blob | undefined;

  public isRecording = false;

  public isSaved = false;

  // is the user using the screen, camera, or both
  public selectedScreenCamera = 'withCameraAndScreen';

  public videoName = 'Video Title';

  public annotationListId = '';

  /*
    Private
  */
  // either camera or screen stream
  private stream: MediaStream | undefined;

  // used for combined screen and camera stream
  private streamMulti: MediaStream[] | undefined;

  private recorder: RecordRTC | any;

  private startRecordingTime : Date;

  @ViewChild('videoElement', {static: false}) videoElement: ElementRef | undefined;

  constructor(private videoService: VideoService,
              private toastr: ToastrService,) {}

  ngAfterViewInit(): void {
    if (this.videoElement) {
      const videoElement: HTMLVideoElement = this.videoElement.nativeElement;
      videoElement.muted = false;
      videoElement.controls = true;
      videoElement.autoplay = false;
      this.getAudioDevices();
    }
  }

  public startRecording(): void {
    this.isRecording = true;
    this.isSaved = false;

    if (this.selectedScreenCamera === 'withCameraAndScreen') {
      this.captureScreen((screen: any) => {
        this.captureCamera((camera: any) => {
          screen.width = 1280;
          screen.height = 720;
          screen.fullcanvas = true;
          camera.width = 487;
          camera.height = 274;
          camera.top =  screen.height - camera.height;
          camera.left = screen.width - camera.width;
          this.successVideoMultiCallback([screen, camera]);
        });
      });
    }
    else if (this.selectedScreenCamera === 'withScreen') { // just screen
      this.captureScreen((stream: MediaStream) => {
        this.successVideoCallback(stream);
      });
    }
    else if (this.selectedScreenCamera === 'withCamera') { // just camera
      this.captureCamera((stream: MediaStream) => {
        this.successVideoCallback(stream);
      });
    }
    else {
      console.error('ERROR: Share your screen or camera.');
    }
    this.startRecordingTime = new Date();
  }

  public saveRecording(): void {
    this.isRecording = false;
    this.isSaved = true;
    if (this.videoElement && (this.recorder || this.recorder)) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      if (this.selectedScreenCamera === 'withCameraAndScreen') {
        this.recorder.stopRecording().then(() => {
          this.recorder.getBlob().then((blob: Blob) => {
            this.watchVideoRecording(blob, video);
          });
        });
      } else {
        this.recorder.stopRecording( this.stopRecording.bind(this) );
      }
      this.stopTracks();
    }
    else {
      console.error('ERROR: Can\'t find video element or stream.');
    }
  }

  private getVideoDuration() {
    const duration = this.videoElement.nativeElement.duration;
    return duration;
  }

  private getCurrentUser() {
    // TODO get user from login
    return 'u5';
  }

  private saveToDB(blob: any) {
    // TODO add description
    const formData = new FormData();
    const duration = this.getVideoDuration();
    formData.append('url', blob);
    formData.append('title', this.videoName);
    formData.append('duration', duration);
    formData.append('fileName', this.getVideoName() + '.webm');
    formData.append('createdBy', this.getCurrentUser());
    const response = this.videoService.postVideo(formData);
    response.subscribe((res) => {
      this.annotationListId = res.annotationListID;
      this.toastr.success('Save complete!');
    });
  }

  public download(): void {
    const fileName = this.getVideoName() + '.webm';
    if (this.isSaved) {
      RecordRTC.invokeSaveAsDialog(this.blob, fileName);
    }
    else {
      console.error('ERROR: Record and save before downloading.');
    }
  }

  public getVideoSize(): string {
    // returns size in MB or GB
    if (this.blob) {
      return RecordRTC.bytesToSize(this.blob.size);
    }
    else {
      console.error('ERROR: Record and save before getting the size.');
      return '';
    }
  }

  private async getMediaAccess(): Promise<void> {
    try {
      // asks for permission to access device list
      await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    }
    catch {
      console.error('ERROR: Please give permission to audio and video');
    }
  }

  private getAudioDevices(): void {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.error('ERROR: Can not get audiodevices.');
      return;
    }
    else {
      this.getMediaAccess();
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          this.audioDevices = devices
            .filter(d => d.kind === 'audioinput')
            .map(d => {
              return { name: d.label, id: d.deviceId };
            });
          this.audioDeviceId = this.audioDevices[0].id;
        })
        .catch(err => {
          console.error('ERROR: Can not get MediaDeviceInfo list.', err.name, ': ', err.message);
        });
    }
  }

  private stopRecording(audioVideoWebMURL: any): void {
    /** Used to stop the single streams like camera or screen */
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const recordRTC = this.recorder;
    video.src = audioVideoWebMURL;
    const recordedBlob = recordRTC.getBlob();
    this.watchVideoRecording(recordedBlob, video);
  }

  private captureScreen(callback: any): void {
    this.getDisplay(
      (screen: any) => {
        callback(screen);
      },
      (error: any) => {
        console.error('ERROR: Unable to capture your screen stream.');
      }
    );
  }

  private captureCamera(callback: any): void {
    const constraints = {
      video: {
        facingMode: 'user',
        width: 1280,
        height: 720
      },
      audio: {
        deviceId: { exact: this.audioDeviceId }
      },
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(callback)
      .catch(err => {
        console.error('ERROR: Cannot capture your camera stream.');
      });
  }

  private getDisplay(success: (screen: any) => void, error: (error: any) => void): void {
    const constraints = {
      type: 'video',
      video: {
        width: 1280,
        height: 720,
      }
    };

    // @ts-ignore
    if (navigator.mediaDevices.getDisplayMedia) {
      // @ts-ignore
      navigator.mediaDevices.getDisplayMedia(constraints)
        .then(success)
        .catch(error);
    } else {
      console.error('ERROR: Your browser doesnt support getDisplayMedia.');
    }
  }

  private successVideoCallback(stream: MediaStream): void {
    this.stream = stream;
    if (this.videoElement) {
      const videoElement: HTMLVideoElement = this.videoElement.nativeElement;
      videoElement.srcObject = stream;
      this.toggleControls();
      this.isRecording = true;
      this.recorder = new RecordRTC(
        stream,
        {
          audio: true,
          // @ts-ignore
          video: true,
          bitsPerSecond: 51200000,
          frameRate: 60
        });
      this.recorder.startRecording();
    }
  }

  private successVideoMultiCallback(stream: MediaStream[]): void {
    this.streamMulti = stream;
    if (this.videoElement) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      this.toggleControls();
      this.isRecording = true;
      // @ts-ignore
      this.recorder = new RecordRTC.RecordRTCPromisesHandler(
        stream,
        {
          type: 'video',
          mimeType: 'video/webm',
          bitsPerSecond: 51200000,
          frameRate: 60,
          previewStream:  (s: MediaStream) => {
            video.srcObject = s;
          },
        }
      );
      // @ts-ignore
      this.recorder.startRecording();
    }
  }

  private stopTracks(): void {
    if (this.selectedScreenCamera === 'withCameraAndScreen' && this.streamMulti) {
      this.streamMulti.forEach(stream => {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      });
    }
    else if (this.stream) {
      this.stream.getAudioTracks().forEach(track => track.stop());
      this.stream.getVideoTracks().forEach(track => track.stop());
    }
    else {
      console.error('ERROR: Stream is not defined.');
    }
  }

  private watchVideoRecording(blob: Blob, video: HTMLVideoElement): void {
    this.blob = blob;
    video.srcObject = null;
    video.src = URL.createObjectURL(blob);
    video.muted = false;
    video.controls = true;
    video.load();
    video.onloadeddata = () => {
      video.play();
    };
    video.ondurationchange = (event) => {
      if (video.duration !== Number.POSITIVE_INFINITY) {
        //save to database
        this.saveToDB(blob);
      }
    }
  }

  private toggleControls(): void {
    if (this.videoElement) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.muted = !video.muted;
      video.controls = !video.controls;
      video.autoplay = !video.autoplay;
    }
  }

  private getVideoName(): string {
    return this.videoName.replace(/ /g, "_") + '_' + this.generateRandomID();
  }

  private generateRandomID(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  }

}
