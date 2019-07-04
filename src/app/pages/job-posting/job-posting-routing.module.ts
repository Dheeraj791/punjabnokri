import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobPostingPage } from './job-posting';

const routes: Routes = [
  {
    path: '',
    component: JobPostingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatePageRoutingModule { }
