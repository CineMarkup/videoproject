import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from '../../_models/video-model';
import { Options } from 'ng5-slider';
import { VideoService } from '../video.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

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

  loaded = false;

  rangeOptions: Options;

  _minValue = 0;

  set minValue(v: number){
    this._minValue = v;
  }
  get minValue(){
    return this._minValue;
  }

  constructor(
    private route: ActivatedRoute, private videoService: VideoService, private toastr: ToastrService, private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const videoId = params['id'];
      if (videoId) {
        this.videoService.getVideoById(videoId).then(video => {
          this.video = video;
        });
      } else {
        this.videoService.getMainVideo().then(video => {
          if (video) {
            const newVideo = {
              url: video.url
              , isMain: false
              , start: 0
            };
            this.video = newVideo;
          } else {
            this.toastr.error('Main video doesn\'t exist, please add one')
          }
        });
      }
    });
  }

  onLoadedMetaData(video: VideoModel): void {
    this.video.duration = video.duration;
    if (!this.video.id) {
      this.video.end = this.video.duration;
    }
    this.rangeOptions = {
      floor: 0,
      ceil: this.video.duration
      , showTicks: false
      , showTicksValues: false
    };
    this.loaded = true;
  }

  onTimeUpdate(event): void {
    if (this.maxValue === 0){
      this.maxValue = this.rangeOptions.ceil;
    }
  }

  validate(): boolean {
    if (this.video.start < 0){
      return false;
    }
    return true;
  }

  save(): void {
    if (!this.validate()) {
      this.toastr.error('Please review the values entered');
    }
    if (this.video.id) {
      this.videoService.updateClip(this.video).then(() => {
        this.toastr.success('Clip updated successfully');
        this.router.navigateByUrl('/playlist');
      });
    } else {
      this.videoService.addClip(this.video).then(() => {
        this.toastr.success('Clip added successfully');
        this.router.navigateByUrl('/playlist');
      });
    }
  }
}
