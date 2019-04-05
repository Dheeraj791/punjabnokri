import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupJobseekerPage } from './signup-jobseeker';

const routes: Routes = [
  {
    path: '',
    component: SignupJobseekerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupJobSeekerPageRoutingModule { }
