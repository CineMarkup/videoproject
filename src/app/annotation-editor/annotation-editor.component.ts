import { Component, OnInit, Input, NgZone } from '@angular/core';
import { VideoModel } from '../../_models/video-model';
import { Options } from 'ng5-slider';
import { VideoService } from '../_services/video.service';
import { AnnotationService } from '../_services/annotation.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnotationListService } from '../_services/annotation-list.service';

/**
 * Add an annotation to a video along with the start and stop time
 * and position on the video
 */
@Component({
  selector: 'app-annotation-editor',
  templateUrl: './annotation-editor.component.html',
  styleUrls: ['./annotation-editor.component.css']
})
export class AnnotationEditorComponent implements OnInit {

  public video: VideoModel;

  public annotation: any;

  public loaded = false;

  public rangeOptions: Options;

  private annotationListID: string;

  private annotationID: string;

  private maxValue = 0;

  // tslint:disable-next-line: variable-name
  _minValue = 0;

  set minValue(v: number){
    this._minValue = v;
  }

  get minValue(): number {
    return this._minValue;
  }

  constructor (
      private route: ActivatedRoute,
      private videoService: VideoService,
      private annotationService: AnnotationService,
      private annotationListService: AnnotationListService,
      private toastr: ToastrService,
      private router: Router,
      private ngZone: NgZone
    ) {

      const videoId: string = this.route.snapshot.queryParamMap.get('videoId');
      this.annotationID = this.route.snapshot.queryParamMap.get('annotationID');
      this.annotationListID = this.route.snapshot.queryParamMap.get('annotationListID');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      if (this.annotationID && videoId) {
        // Editing an annotation
        this.getAnnotationData(this.annotationID, videoId);
      }
      else if (videoId) {
        // Create a new annotation
        this.videoService.getVideoById(videoId).subscribe(video => {
          this.video = video;
          const newAnnotation = {
            annotationID: 'temp',
            createdAt: '2/11/2021',
            startTime: 0,
            text: '',
          };
          this.annotation = newAnnotation;
        });
      }
  }

  ngOnInit(): void { }

  public onLoadedMetaData(video: VideoModel): void {
    this.video.duration = video.duration as number;
    if (!this.annotation) {
      this.annotation.stopTime = this.video.duration as number;
    }
    this.rangeOptions = {
      floor: 0,
      ceil: video.duration as number,
      showTicks: false,
      showTicksValues: false
    };
    this.loaded = true;
  }

  public onTimeUpdate(event: any): void {
    if (this.maxValue === 0){
      this.maxValue = this.rangeOptions.ceil;
    }
  }

  public save(): void {
    if (!this.validate()) {
      this.toastr.error('Please review the values entered');
    }
    else{
      if (!this.annotationID) {
        this.saveNewAnnotation();
      }
      else {
        const response = this.annotationService.putAnnotation(this.annotationID, this.annotation);
        response.subscribe((r) => {
          console.log(r);
        });
      }
      this.toastr.success('We saved your annotation!');
    }
  }

  public viewPlaylist() {
    this.router.navigateByUrl('/playlist/' + this.annotationListID);
  }

  private getAnnotationData(annotationID: string, videoID: string) {
    this.annotationService.getAnnotationById(annotationID).subscribe(annotation => {
        this.annotation = annotation;
    });
    this.videoService.getVideoById(videoID).subscribe(video => {
      this.video = video;
    });
  }

  private validate(): boolean {
    if (this.annotation.start < 0){
      return false;
    } else if (!this.annotation.text) {
      return false;
    }
    return true;
  }

  private saveNewAnnotation() {
    const response = this.annotationService.postAnnotation(this.annotation);
    response.subscribe((res) => {
      const annotation = { "annotationList" : res.annotationID};
      const results = this.annotationListService.addAnnotationToList(this.annotationListID, annotation);
      results.subscribe((r) => {
        console.log(r);
      });
    });
  }

}
