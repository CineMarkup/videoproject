
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoModel } from '../../_models/video-model';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from '../_components/alert-modal';

/**
 * Displays all annotations for a single video
 */
@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {

  @Input() video: VideoModel;
  @Input() editable = false;
  @Input() isPlaying =  false;

  @Output() editVideo: EventEmitter<VideoModel> = new EventEmitter();
  @Output() deleteVideo: EventEmitter<VideoModel> = new EventEmitter();

  @Output() playThisVideo: EventEmitter<VideoModel> = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  onEditVideo(): void {
    this.editVideo.emit(this.video);
  }

  onDeleteVideo(): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
              data: {
                    warnMessage: 'Click continue to delete the clip',
                    title: 'Confirm deletion'
                  }
              });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === 'Continue') {
        this.deleteVideo.emit(this.video);
      }
    });
  }

  onPlayThisVideo(): void {
    this.playThisVideo.emit(this.video);
  }
}
