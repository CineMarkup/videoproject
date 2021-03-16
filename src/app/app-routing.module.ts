import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationEditorComponent } from './annotation-editor/annotation-editor.component';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RecorderComponent } from './recorder/recorder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'record', component: RecorderComponent },
  { path: 'home', component: HomeComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'annotation', component: AnnotationEditorComponent },
  { path: 'annotation/:id', component: AnnotationEditorComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'video-gallery', component: VideoGalleryComponent },
  { path: 'view/:id', component: PlaylistComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
