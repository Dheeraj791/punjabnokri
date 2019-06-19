import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CreatePage } from './create';
import { MatchesPageRoutingModule } from './create-routing.module';
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
    CreatePage
  ],
  providers: [
  ]
})
export class CreateModule { }
