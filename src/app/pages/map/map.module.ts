import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapPage } from './map';
import { MapPageRoutingModule } from './map-routing.module';
import { HyrSkillsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule,
    HyrSkillsModule
  ],
  declarations: [
    MapPage
  ]
})
export class MapModule { }
