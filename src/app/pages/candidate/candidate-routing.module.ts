import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidatePage } from './candidate';

const routes: Routes = [
  {
    path: '',
    component: CandidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatePageRoutingModule { }
