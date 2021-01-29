import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecorderComponent } from './recorder/recorder.component';

const routes: Routes = [
  { path: "", redirectTo:"record-mixed", pathMatch:"full" },
  { path: 'record', component: RecorderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
