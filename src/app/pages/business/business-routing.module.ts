import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessPage } from './business';

const routes: Routes = [
  {
    path: '',
    component: BusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatePageRoutingModule { }
