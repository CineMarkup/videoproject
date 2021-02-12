import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { HotkeyModule } from 'angular2-hotkeys';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecorderComponent } from './recorder/recorder.component';
import { HomeComponent } from './home/home.component';
import { AlertModalComponent } from './_components/alert-modal';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoService } from './_services/video.service';
import { AnnotationService } from './_services/annotation.service';
import { AnnotationListService } from './_services/annotation-list.service';
import { PlaylistService } from './_services/playlist.service';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AnnotationEditorComponent } from './annotation-editor/annotation-editor.component';
import { AnnotationValidatorDirective } from './directives/annotation-validator.directive';
import { AnnotationsComponent } from './annotations/annotations.component';

@NgModule({
  declarations: [
    AppComponent,
    RecorderComponent,
    HomeComponent,
    AlertModalComponent,
    PlaylistComponent,
    VideoPlayerComponent,
    AnnotationEditorComponent,
    AnnotationValidatorDirective,
    AnnotationsComponent
  ],
  imports:      [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HotkeyModule.forRoot()
  ],
  providers: [
    AnnotationService,
    AnnotationListService,
    VideoService,
    PlaylistService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
