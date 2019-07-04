import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { JobPostingPage } from './job-posting';
import { CandidatePageRoutingModule } from './job-posting-routing.module';
import { HyrSkillsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CandidatePageRoutingModule,
    FormsModule,
    HyrSkillsModule
  ],
  declarations: [
    JobPostingPage
  ],
  providers: [

  ]
})
export class JobPostingModule { }
