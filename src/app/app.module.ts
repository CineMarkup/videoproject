import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
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
import { LoginService } from './_services/login.service';
import { AnnotationService } from './_services/annotation.service';
import { AnnotationListService } from './_services/annotation-list.service';
import { PlaylistService } from './_services/playlist.service';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AnnotationEditorComponent } from './annotation-editor/annotation-editor.component';
import { AnnotationValidatorDirective } from './directives/annotation-validator.directive';
import { AnnotationsComponent } from './annotations/annotations.component';
import { TagsComponent } from './tags/tags.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    AnnotationsComponent,
    TagsComponent,
    LoginComponent,
    RegisterComponent,
    VideoGalleryComponent,
    DashboardComponent
  ],
  imports:      [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatChipsModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
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
    LoginService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
