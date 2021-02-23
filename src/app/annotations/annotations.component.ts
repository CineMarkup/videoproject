import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoModel } from '../../_models/video-model';
import { AnnotationModel } from '../../_models/annotation-model';
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

  @Input() annotation: AnnotationModel;

  @Input() editable = false;

  @Input() isPlaying =  false;

  @Output() editAnnotation: EventEmitter<AnnotationModel> = new EventEmitter();

  @Output() deleteAnnotation: EventEmitter<AnnotationModel> = new EventEmitter();

  @Output() playFromAnnotationStart: EventEmitter<AnnotationModel> = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  public onEditAnnotation(): void {
    this.editAnnotation.emit(this.annotation);
  }

  public onDeleteAnnotation(): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
              data: {
                    warnMessage: 'Click continue to delete the clip',
                    title: 'Confirm deletion'
                  }
              });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === 'Continue') {
        this.deleteAnnotation.emit(this.annotation);
      }
    });
  }

  public onplayFromAnnotationStart(): void {
    this.playFromAnnotationStart.emit(this.annotation);
  }
}
