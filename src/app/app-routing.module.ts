import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationEditorComponent } from './annotation-editor/annotation-editor.component';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RecorderComponent } from './recorder/recorder.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'record', component: RecorderComponent },
  { path: 'home', component: HomeComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'video', component: AnnotationEditorComponent },
  { path: 'video/:id', component: AnnotationEditorComponent }

];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
