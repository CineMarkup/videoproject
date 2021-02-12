import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from '../../_models/video-model';
import { Options } from 'ng5-slider';
import { VideoService } from '../_services/video.service';
import { AnnotationService } from '../_services/annotation.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {v4 as uuid} from 'uuid';

/**
 * Add an annotation to a video along with the start and stop time
 */
@Component({
  selector: 'app-annotation-editor',
  templateUrl: './annotation-editor.component.html',
  styleUrls: ['./annotation-editor.component.css']
})
export class AnnotationEditorComponent implements OnInit {

  @Input() video: VideoModel;

  maxValue = 0;

  annotation: any;

  loaded = false;

  rangeOptions: Options;

  // tslint:disable-next-line: variable-name
  _minValue = 0;

  set minValue(v: number){
    this._minValue = v;
  }

  get minValue(): number {
    return this._minValue;
  }

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private annotationService: AnnotationService,
    private toastr: ToastrService,
    private router: Router
    ) {

      const annotationId: string = this.route.snapshot.queryParamMap.get('annotationId');
      const videoId: string = this.route.snapshot.queryParamMap.get('videoId');
      console.log( annotationId, ' ', videoId );

      if (annotationId && videoId) {
        // Editing a current annotation
        this.annotationService.getAnnotationById(annotationId).subscribe(annotation => {
            this.annotation = annotation;
        });
        this.videoService.getVideoById(videoId).subscribe(video => {
          this.video = video;
        });

      } else if (videoId) {
        // Create a new annotation
        this.videoService.getVideoById(videoId).subscribe(video => {
          this.video = video;
          const newAnnotation = {
            annotationId: uuid(),
            createdAt: '2/11/2021',
            startTime: 0,
            text: '',
          };
          this.annotation = newAnnotation;
        });
      }
  }

  ngOnInit(): void { }

  onLoadedMetaData(video: VideoModel): void {
    this.video.duration = video.duration;
    if (!this.annotation) {
      this.annotation.stopTime = this.video.duration;
    }
    this.rangeOptions = {
      floor: 0,
      ceil: this.video.duration
      , showTicks: false
      , showTicksValues: false
    };
    this.loaded = true;
  }

  onTimeUpdate(event: any): void {
    if (this.maxValue === 0){
      this.maxValue = this.rangeOptions.ceil;
    }
  }

  validate(): boolean {
    // TODO make this validation more
    if (this.annotation.start < 0){
      return false;
    } else if (!this.annotation.text) {
      return false;
    }
    return true;
  }

  save(): void {
    if (!this.validate()) {
      this.toastr.error('Please review the values entered');
    }
    else{
      // TODO: make service calls to post edits to annotation
      this.toastr.success('Saving...');
      this.router.navigateByUrl('/playlist');

      // if (this.annotation.id) {
      //   this.videoService.updateAnnotation(this.video).then(() => {
      //     this.toastr.success('Annotation updated successfully');
      //     this.router.navigateByUrl('/playlist');
      //   });
      // } else {
      //   this.videoService.addAnnotation(this.video).then(() => {
      //     this.toastr.success('Annotation added successfully');
      //     this.router.navigateByUrl('/playlist');
      //   });
      // }
    }

  }
}
