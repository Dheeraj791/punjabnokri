import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { RatingComponent } from './rating/rating.component'

@NgModule({
    declarations: [
        RatingComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        RatingComponent
    ]
})
export class HyrSkillsModule { }
