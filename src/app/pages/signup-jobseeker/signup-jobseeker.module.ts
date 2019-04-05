import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupJobseekerPage } from './signup-jobseeker';
import { SignupJobSeekerPageRoutingModule } from './signup-jobseeker-routing.module';
import { HyrSkillsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupJobSeekerPageRoutingModule,
    HyrSkillsModule
  ],
  declarations: [
    SignupJobseekerPage,
  ]
})
export class SignUpJobseekerModule { }
