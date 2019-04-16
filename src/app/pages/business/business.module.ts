import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BusinessPage } from './business';
import { CandidatePageRoutingModule } from './business-routing.module';
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
    BusinessPage
  ],
  providers: [

  ]
})
export class BusinessModule { }
