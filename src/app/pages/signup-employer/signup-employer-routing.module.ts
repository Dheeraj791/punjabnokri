import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupEmployerPage } from './signup-employer';

const routes: Routes = [
  {
    path: '',
    component: SignupEmployerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupEmployerPageRoutingModule { }
