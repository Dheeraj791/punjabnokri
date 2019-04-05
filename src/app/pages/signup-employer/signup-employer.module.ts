import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupEmployerPage } from './signup-employer';
import { SignupEmployerPageRoutingModule } from './signup-employer-routing.module';
import { HyrSkillsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupEmployerPageRoutingModule,
    HyrSkillsModule
  ],
  declarations: [
    SignupEmployerPage,
  ]
})
export class SignUpEmployerModule { }
