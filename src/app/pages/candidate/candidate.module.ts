import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CandidatePage } from './candidate';
import { CandidatePageRoutingModule } from './candidate-routing.module';
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
    CandidatePage
  ],
  providers: [

  ]
})
export class CandidateModule { }
