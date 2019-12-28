import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TutorialPage } from './tutorial';
import { TutorialPageRoutingModule } from './tutorial-routing.module';
import { Storage } from '@ionic/storage';
import { HyrSkillsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TutorialPageRoutingModule,
    HyrSkillsModule
  ],
  declarations: [TutorialPage],
  entryComponents: [TutorialPage],
  providers: []
})

export class TutorialModule { }
