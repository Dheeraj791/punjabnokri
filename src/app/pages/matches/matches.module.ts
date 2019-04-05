import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { MatchesPage } from './matches';
import { MatchesPageRoutingModule } from './matches-routing.module';
import { FilterPipe } from '../../pipes/filter';
import { HyrSkillsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatchesPageRoutingModule,
    FormsModule,
    HyrSkillsModule
  ],
  declarations: [
    MatchesPage,
    FilterPipe
  ],
  providers: [
    FilterPipe
  ]
})
export class MatchesModule { }
